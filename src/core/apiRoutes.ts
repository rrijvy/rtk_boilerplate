class ApiRoutes {
  public static readonly login = "/auth/login";
  public static readonly register = "/auth/register";
  public static readonly get_profile = (username: string) => `/auth/get_profile/${username}`;
}

export default ApiRoutes;
