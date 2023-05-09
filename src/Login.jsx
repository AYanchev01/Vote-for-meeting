export const Login = () => {
    return (
        <form>
            <label for="email">email:</label>
            <input type = "email" placeholder="youremail@mail.com" id="email" name="email"/>

            <label for="password">password:</label>
            <input type = "password" placeholder="********" id="password" name="password"/>
            <button>Log in</button>
        </form>
    )
}