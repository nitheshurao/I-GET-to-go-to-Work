import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/ checkPermissions.js'
import mongoose from 'mongoose'


const createJob = async (req, res) => {
    // res.send("create job")

    const { position, company } = req.body

    if (!position || !company) {
        throw new BadRequestError('Please Provide All Vaues')
    }

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const deleteJob = async (req, res) => {
    // res.send("delet")
    const { id: jobId } = req.params
    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    checkPermissions(req.user, job.createdBy)

    await job.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! job Removed' })

}

const getAllJob = async (req, res) => {
    // res.send("get all")
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, nomOfPages: 1 })
}

const updateJob = async (req, res) => {
    // res.send("updat jon")a
    const { id: jobId } = req.params
    const { company, position, jobLocation } = req.body
    if (!position || !company) {
        throw new BadRequestError('Please Provide All Vaues')
    }

    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    // checkPermissions
    // req.user.userId(string) === job.createdBy(Object)

    checkPermissions(req.user, job.createdBy)
    //check perison

    const updatedJob = await Job.findByIdAndUpdate(
        { _id: jobId },
        req.body,
        {
            new: true,
            runValidators: true,
        })
    res.status(StatusCodes.OK).json({ updatedJob })
    // Altenvie 
    // job.position = position
    // job.company = company
    // job.jobLocation = joblocation

    // await job.save()
    // res.status(StatusCodes.OK).json({ job })
}
const showStats = async (req, res) => {
    // res.send("show stahs")
    // get data of user
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        // /gropuing based on status
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ])
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }
    let monthlyApplications = []
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}



export { createJob, deleteJob, updateJob, getAllJob, showStats }