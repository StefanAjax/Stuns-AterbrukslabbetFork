interface GetPostTypeSpecificDataProps {
  postType: string;
}

export default function getPostTypeSpecificData({ postType }: GetPostTypeSpecificDataProps) {
  let postTypeColor;

  if (postType === "Erbjuds") {
    postTypeColor = "bg-offer";
  } else if (postType === "Efterfrågas") {
    postTypeColor = "bg-request";
  } else {
    postTypeColor = "bg-primary";
  }

  return { postTypeColor };
}
