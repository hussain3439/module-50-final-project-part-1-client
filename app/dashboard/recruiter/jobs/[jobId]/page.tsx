
import { detailJob } from "@/lib/api/jobs";
import Link from "next/link";

import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit,
  MapPin,
  Users,
  Building2,
  Sparkles,
  FileText,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Format date
const formatDate = (date: string) => {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const JobDetailPage = async ({params}: {params: Promise<{ jobId: string }>;}) => {
  const { jobId } = await params;

  // Fetch single job
  const job = await detailJob(jobId);

  return (
    <div className="min-h-screen bg-slate-50/80 dark:bg-background">

      <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">

          <Button variant="ghost">
            <Link href="/dashboard/recruiter/jobs" className="flex items-center gap-1">
              <ArrowLeft className="mr-2 size-4" />
              Back to Jobs
            </Link>
          </Button>

          <Button className="gap-2">
            <Link href={`/dashboard/recruiter/jobs/${job._id}/edit`} className="flex items-center gap-1">
              <Edit className="size-4" />
              Edit Job
            </Link>
          </Button>

        </div>

        {/* Job Header */}
        <Card className="overflow-hidden border-0 shadow-sm">

          <CardContent className="p-5 sm:p-8">

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

              <div className="space-y-5">

                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    {job.category}
                  </Badge>

                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400">
                    {job.type}
                  </Badge>
                </div>

                <div className="space-y-3">

                  <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">

                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-primary" />
                      {job.location || "Remote"}
                    </span>

                    <span className="flex items-center gap-2">
                      <BriefcaseBusiness className="size-4 text-primary" />
                      {job.type}
                    </span>

                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-primary" />
                      Deadline: {formatDate(job.deadline)}
                    </span>

                  </div>

                </div>

              </div>

              {/* Salary */}
              <div className="rounded-2xl border bg-primary/5 p-6 lg:min-w-64">
                <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-5 text-primary" />
                  <span className="text-sm font-medium">
                    Salary Range
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-primary">
                    {job.currency} {job.salaryMin} - {job.salaryMax}
                </h2>

                <p className="mt-2 text-xs text-muted-foreground">
                  Monthly compensation
                </p>
              </div>

            </div>

          </CardContent>
        </Card>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-6 lg:col-span-2">

            {/* Responsibilities */}
            <Card className="border-0 shadow-sm">

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950">
                    <FileText className="size-5 text-blue-600" />
                  </div>
                  Job Responsibilities
                </CardTitle>

                <CardDescription>
                  What you will do in this position
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-7 whitespace-pre-line text-muted-foreground">
                  {job.responsibilities || "No responsibilities provided."}
                </p>
              </CardContent>

            </Card>

            {/* Requirements */}
            <Card className="border-0 shadow-sm">

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950">
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  </div>
                  Requirements & Qualifications
                </CardTitle>

                <CardDescription>
                  Skills and qualifications needed for this role
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-7 whitespace-pre-line text-muted-foreground">
                  {job.requirements || "No requirements provided."}
                </p>
              </CardContent>

            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-sm">

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-950">
                    <Sparkles className="size-5 text-amber-600" />
                  </div>
                  Benefits & Perks
                </CardTitle>

                <CardDescription>
                  What the company offers
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-7 whitespace-pre-line text-muted-foreground">
                  {job.benefits || "No benefits information provided."}
                </p>
              </CardContent>

            </Card>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* Job Overview */}
            <Card className="border-0 shadow-sm">

              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
                <CardDescription>
                  Important job information
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <BriefcaseBusiness className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Job Category
                    </p>
                    <p className="text-sm font-semibold">
                      {job.category}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <MapPin className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Location
                    </p>
                    <p className="text-sm font-semibold">
                      {job.location || "Remote"}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Job Type */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Clock className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Employment Type
                    </p>
                    <p className="text-sm font-semibold">
                      {job.type}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Salary */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <DollarSign className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Salary
                    </p>
                    <p className="text-sm font-semibold">
                        {job.currency} {job.salaryMin} - {job.salaryMax}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Deadline */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <CalendarDays className="size-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Application Deadline
                    </p>
                    <p className="text-sm font-semibold">
                      {formatDate(job.deadline)}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Applicants */}
            {typeof job.applicantsCount === "number" && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-primary/10 p-3">
                      <Users className="size-6 text-primary" />
                    </div>

                    <div>
                      <p className="text-2xl font-bold">
                        {job.applicantsCount}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Total Applicants
                      </p>
                    </div>

                  </div>

                  <Separator className="my-4" />

                  <Button variant="outline" className="w-full">
                    <Link href={`/dashboard/recruiter/jobs/${job._id}/applicants`}>
                      View Applicants
                    </Link>
                  </Button>

                </CardContent>
              </Card>
            )}

            {/* Recruiter Note */}
            <Card className="border border-primary/10 bg-primary/5 shadow-none">

              <CardContent className="flex gap-3 p-5">

                <Building2 className="mt-1 size-5 shrink-0 text-primary" />

                <div>
                  <h3 className="text-sm font-semibold">
                    Hiring Dashboard
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Manage your job posting, track applicants and
                    keep your recruitment process organized.
                  </p>
                </div>

              </CardContent>
            </Card>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
