const notFountMiddleware = (rew, res) => res.status(404).send("Router doesnot exits")

export default notFountMiddleware