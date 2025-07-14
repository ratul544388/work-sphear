export const formatUserResponse = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role,
  };
};
