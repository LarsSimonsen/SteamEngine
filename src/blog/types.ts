export type BlogPostMetadata = {
    readonly slug: string;
    readonly title: string;
    readonly published: string;
    readonly updated?: string;
    readonly excerpt: string;
    readonly featuredImage?: string;
};

export type BlogPost = BlogPostMetadata & {
    readonly body: string;
    readonly bodyDirectory: string;
};

export type BlogBuildOptions = {
    readonly sourceDirectory: string;
    readonly contentDirectory: string;
    readonly outputDirectory: string;
};
