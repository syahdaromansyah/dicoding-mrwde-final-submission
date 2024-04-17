const createAvatarURL = (name: string) =>
  new URL(
    `https://api.dicebear.com/8.x/lorelei/svg?seed=${name.split(' ')[0]}&backgroundColor=c0aede&hair=variant01,variant02,variant03,variant14,variant15`,
  ).href;

export default createAvatarURL;
