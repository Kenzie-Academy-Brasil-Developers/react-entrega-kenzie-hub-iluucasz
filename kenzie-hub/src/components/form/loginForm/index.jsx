import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { Link } from "react-router-dom";
import { loginFormSchema } from "./loginForm.schema";
import style from "./style.module.scss";
import { useContext, useState } from "react";
import { userContext } from "../../../providers/userContext";

export const LoginForm = () => {

    const [loading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const { userLogin } = useContext(userContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(loginFormSchema),
    })

    const submit = (payLoad) => {
        userLogin(payLoad, setLoading, reset)
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={style.container__login}>
            <div className={style.form__title}>
                <h2 className="title2">Login</h2>
            </div>

            <Input
                label="Email"
                type="email"
                id="email"
                {...register("email")}
                error={errors.email}
            />

            <Input
                label="Senha"
                type={isHidden ? "password" : "text"}
                id="password"
                {...register("password")}
                error={errors.password}
                isHidden={isHidden}
                setIsHidden={setIsHidden}
            />

            <div className={`${style.form__btn}`}>
                <button type="submit" className="btn title2" disabled={loading}>Entrar</button>
                <span className="headline grey">Ainda não possui uma conta?</span>
                <Link to="/register" className="btn grey title2">Cadastre-se</Link>
            </div>

        </form>
    )
}