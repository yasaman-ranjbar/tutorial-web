import { CourseSummary } from "@/types/course-summary.interface";
import { useTranslation } from "../i18n";
import HomeHeroSection from "./_components/home-hero-section/home-hero-section";
import CourseCardList from "./(courses)/_components/course-card-list";
import Feature from "./_components/feature/feature";
import { homeFeatures } from "@/data/home-features";
import Button from "./_components/button/button";
import { IconArrowLeftFill } from "./_components/icons/icons";
import { BlogPostSummary } from "@/types/blog-post-summary-interface";
import { BlogPostCardList } from "./(blog)/_components/blog-post-card-list";
import { API_URL } from "@/configs/global";
import { Suspense } from "react";
import { CardPlaceholder } from "./_components/placeholders";
import { TestimonialList } from "./_components/testimonial/testimonial-list";
import { testimonials } from "@/data/testimonials";

type paramsProps = {
  params: {
    lng: string;
  };
};

// render as static rendering as a default rendering ---------------

// fetch has cashing without sending several req.
// if this function is used in the others pages, if this url does not changed only once call this API
// async function getNewestCourses(count: number): Promise<CourseSummary[]> {
//   await new Promise((resolve) => setTimeout(resolve, 5000))
//   const res = await fetch(`${API_URL}/courses/newest/${count}`, {
//     next: {
//       revalidate: 20, //data revalidate after 20 seconds
//     },
//     cache: "no-store",
//   });
//   // this response cashed in server side
//   return res.json();
// }

async function getNewestPosts(count: number): Promise<BlogPostSummary[]> {
  const res = await fetch(`${API_URL}/blog/newest/${count}`, {
    next: {
      revalidate: 20,
    },
  });
  return res.json();
}

export default async function Home({ params: { lng } }: paramsProps) {
  const { t } = await useTranslation(lng);
  const newestBlogPostsData = getNewestPosts(4);

  // we can Simultaneous fetch data. since these methods has promise method
  // we can merged these with promiseAll method.
  // if all of promise is resolved then Promise.all is resolved. if one of these promise is rejected
  // the Promise.all is rejected. and export of these promise is placed to const [newestCourses, newestBlogPosts] as array destracturing

  const [newestBlogPosts] = await Promise.all([newestBlogPostsData]);

  return (
    <div>
      <HomeHeroSection />
      <section className="dark:bg-base-75 mt-10">
        <div className="container py-10 flex flex-col lg:flex-row gap-10 xl:gap-5">
          {homeFeatures.map((feature) => (
            <Feature key={`feature-${feature.title}`} feature={feature} />
          ))}
        </div>
      </section>

      <section className="container  pt-20">
        <div className="text-center xl:text-right">
          <h2 className="text-2xl font-extrabold">{t("newestCourses")}</h2>
          <p className="mt-3 text-lg">{t("newestCoursesDescription")}</p>
        </div>
        <Suspense fallback={<CardPlaceholder count={4} className="mt-5" />}>
          <CourseCardList courses={[]} />
        </Suspense>
      </section>

      <section className="px-2 my-40">
        {/* <div className="sticky top-0 pt-0 text-center"> */}
        <div className="relative pt-0 text-center">
          <div className="bg-primary pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2 -top-96 rounded-full opacity-10 blur-3xl"></div>

          <h2
            className="gradient leading-[1.3] relative z-10 mx-auto inline-block text-[clamp(2rem,6vw,5.5rem)] font-black"
          >
            {t("ReactNext")}
          </h2>
          <p className="text-base-content/70  relative z-[2] py-4 m-auto md:text-3xl max-w-5xl font-light !leading-[1.7]">
            {t("reactDescriptions")}
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-3 justify-center">
            <Button
              variant="primary"
              size="large"
              className="mt-7"
              animatedIcon={true}
            >
              {t("ReactCourses")}
              <IconArrowLeftFill fill="currentColor" />
            </Button>
            <Button
              variant="neutral"
              size="large"
              className="mt-7"
              animatedIcon={true}
            >
              {t("reactArticles")}
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-between items-center">
          <div className="text-center xl:text-right">
            <h2 className="text-2xl font-extrabold">{t("newestCourses")} </h2>
            <p className="mt-3 text-lg">{t("newestCoursesDescription")}</p>
          </div>
          <Button
            variant="neutral"
            className="font-semibold"
            animatedIcon={true}
          >
            {t("AllArticles")}
            <IconArrowLeftFill fill="currentColor" />
          </Button>
        </div>
        <BlogPostCardList posts={newestBlogPosts} />
      </section>

      <div className="relative mt-32">
        <div className="bg-primary pointer-events-none absolute bottom-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full opacity-5 -top-52 blur-3xl"></div>
        <h2 className="text-info relative z-0 mx-auto text-3xl font-extrabold block w-fit">
          <span className="-z-10 w-8 h-8 absolute bg-info opacity-25 -top-2 rounded-full inline-block -right-3"></span>
          تجربه هم‌میسرهای کلاسبن
        </h2>
        <p className=" mb-32 text-lg text-center mt-2">
          تو اینجا تنها نیستی. ببین هم‌مسیرهات نظرشون در مورد دوره‌های کلاسبن
          چیه
        </p>
        <TestimonialList testimonials={testimonials} />
      </div>
    </div>
  );
}
