import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";

export default async function BlogPage() {
  const payload = await getPayload({ config });

  const posts = await payload.find({
    collection: "posts",
    where: {
      published: {
        equals: true,
      },
    },
    sort: "-publishedDate",
  });

  return (
    <main className="min-h-screen bg-[#0A0100] text-white">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="section-label">INSIGHTS</p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              Latest Insights
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Explore the latest ideas, strategies, and insights from our
              marketing team.
            </p>
          </div>

          {/* Posts */}
          {posts.docs.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-white/10 p-10">
              <p className="text-white/60">
                No published articles yet.
              </p>
            </div>
          ) : (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.docs.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  {/* Category */}
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                    {post.category}
                  </p>

                  {/* Title */}
                  <h2 className="mt-4 text-2xl font-semibold leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-4 line-clamp-3 leading-7 text-white/60">
                    {post.excerpt}
                  </p>

                  {/* Date */}
                  {post.publishedDate && (
                    <p className="mt-6 text-sm text-white/40">
                      {new Date(post.publishedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  )}

                  {/* Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-block text-sm font-medium transition-opacity group-hover:opacity-70"
                  >
                    Read article →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}