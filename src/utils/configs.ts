export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatearBlogPost(
  posts: any,
  
  {
    filterOutDraft = true,
    filterOutFuturePost = true,
    sortPostsByDate = true,
    limit = undefined,
  }  = {}
) {
   
  const filteredPost = posts.reduce((acc: any, post: any) => {
    const { pubDate, draft } = post.frontmatter;
    if (filterOutDraft && draft) return acc;
    if (filterOutFuturePost && new Date(pubDate) > new Date()) return acc;

    //agregar post a acc
    acc.push(post);
    return acc;
  }, []);

  //limite
  if (typeof limit === "number") {
    return filteredPost.slice(0, limit);
  }
  return filteredPost.sort(() => Math.random() - 0.5);
}

 // Capitalize the first letter
export function capitalize(str:string): string {
    if ( typeof str !== 'string' || str.length === 0 ) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
    