
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
    if (!import.meta.client) return;

    const token = localStorage.getItem("Authorization");
    const email = localStorage.getItem("userEmail");
    const baseRouteName = String(to.name || '').split('___')[0];
    
    const publicRoutes = ['login', 'sign-up', 'sign-up-otp'];

    if (!token) {
        if (publicRoutes.includes(baseRouteName)) {
            return { path: '/' };
        }
        return; 
    } else {
        if (baseRouteName === 'sign-up-otp' && !email) {
            return { path: '/sign-up' };
        }
        if (publicRoutes.includes(baseRouteName)) return;
        return { path: '/login' };
    }
});