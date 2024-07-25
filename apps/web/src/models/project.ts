export type Project = {
  _id: string;
  title: string;
  description: string;
  skills: {
    _id: string;
    name: string;
  }[];
  imageUrl: string;
};
