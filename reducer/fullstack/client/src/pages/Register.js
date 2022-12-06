import { useState, useEffect } from 'react';
import { FormRow, Logo, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
// global context and useNavigate later

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    // showAlert: false,
};
// if possible prefer local state
// global state

function Register() {
    const [values, setValues] = useState(initialState);

    const { isLoading, showAlert, displayAlert } = useAppContext();


    // global context and useNavigate later
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        // console.log(e.target);
        setValues({ ...values, [e.target.name]: e.target.value })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        console.log(values);
    };
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {/* name field */}
                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                {/* email field */}
                <FormRow type="text"
                    name={"email"}
                    // value={values.email}
                    handleChange={handleChange} />
                {/* Password field */}
                <FormRow
                    type="password"
                    name={"password"}
                    // value={values.password}
                    handleChange={handleChange} />

                <p>
                    <button type='submit' className='btn btn-block'
                    //  disabled={isLoading}
                    >
                        submit
                    </button>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button'
                        onClick={toggleMember}
                        className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}




export default Register