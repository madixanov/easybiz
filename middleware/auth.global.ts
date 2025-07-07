
// export default defineNuxtRouteMiddleware(async (to, from) => {
//     const token = localStorage.getItem("Authorization")
//     if (token) {
//         if (to.name === "login") return { path: "/" };
//         return true
//     }

//     else {
//         if (to.name === "login") return true;
//         return { path: "/login" }
//     }
// })

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = localStorage.getItem("Authorization")
    const email = localStorage.getItem("userEmail");

    if (token) {
        if (to.name === "login" || to.name === "sign-up" || to.name === "sign-up-otp") {
            return { path: "/" };
        }
        return true;
    } else {
        if (to.name === "sign-up-otp" && !email) {
            return { path: "/sign-up" };
        }
        if (to.name === "login" || to.name === "sign-up" || to.name === "sign-up-otp") {
            return true;
        }
        return { path: "/sign-up" };
    }
})