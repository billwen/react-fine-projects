import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";

export interface LoginProp {
    setToken: Dispatch<SetStateAction<string | null>> 
}

interface Credential {
    username: string;
    password: string;
}

async function loginUser(credentials: Credential) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then( data => data.json());
}

const Login = ({setToken}: LoginProp) => {

    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();

        if (username == null || password == null) {
            console.log("Invalid username or password");
            return;
        }

        const credentials = {
            username: username as string,
            password: password as string
        }

        const token = await loginUser(credentials);
        setToken(token);
    }

    return (
        <div className="flex flex-col mx-auto  max-w-md text-lg text-gray-900 ">
            <h1 className="text-4xl text-center my-4">Please Log In</h1>

            <form onSubmit={handleSubmit}>
            <label>
                <p className="my-2">Username</p>
                <input type="text" className=" w-full border border-gray-500 rounded-sm" onChange={e => setUsername(e.target.value)} />
            </label>

            <label>
                <p className="my-2">Password</p>
                <input type="password" className="w-full border border-gray-500 rounded-sm" onChange={e => setPassword(e.target.value)} />
            </label>

            <div className="text-center">
                <button className="my-4 p-4 rounded-sm text-2xl bg-teal-600 text-white" type="submit">Submit</button>
            </div>
        </form>

        </div>

    );
}

export default Login;