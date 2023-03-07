const routes = {
  home: "/",
  contact: "/contact",
  login: (nextRoute = null) =>
    nextRoute ? `/login/?next=${nextRoute}` : '/login',
  signUp: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  search: "/search",
  boardById: (boardUuid: string) => `/search?id=${boardUuid}`,
  boards: "/boards",
  profile: "/profile",
  userBoards: "/profile/boards",
  userSubscription: "/profile/subscription",
}
export default routes
