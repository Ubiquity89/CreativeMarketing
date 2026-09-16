import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "posts",
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          published: {
            equals: true,
          },
        },
      ],
    },
    limit: 1,
  });

  const post = result.docs[0];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0100] text-white">
      <article className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back */}
          <Link
            href="/blog"
            className="text-sm text-white/50 transition-opacity hover:opacity-70"
          >
            ← Back to Insights
          </Link>

          {/* Category */}
          <p className="section-label mt-12">
            {post.category}
          </p>

          {/* Title */}
          <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/40">
            <span>
              By {post.author}
            </span>

            {post.publishedDate && (
              <>
                <span>•</span>
                <span>
                  {new Date(post.publishedDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </>
            )}
          </div>

          {/* Excerpt */}
          <p className="mt-10 border-l border-white/20 pl-6 text-xl leading-9 text-white/60">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-invert mt-14 max-w-none">
            <RichText data={post.content} />
          </div>
        </div>
      </article>
    </main>
  );
}