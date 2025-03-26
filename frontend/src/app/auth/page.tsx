export default async function Page() {
    return (
        <main>
            <h1>Register</h1>
            <form action="">
                <label>
                    <span>Username</span>
                    <input type="text" placeholder="azuredragonfly" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" required />
                </label>
                <button type="submit">
                    <span>Register</span>
                </button>
            </form>
            <h1>Login</h1>
            <form action="">
                <label>
                    <span>Username</span>
                    <input type="text" placeholder="azuredragonfly" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" required />
                </label>
                <button type="submit">
                    <span>Register</span>
                </button>
            </form>
        </main>
    )
}