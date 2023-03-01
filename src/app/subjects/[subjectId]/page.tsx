import Container from "@/components/Container";
import Question from "@/components/Question";
import {
  Collections,
  QuestionResponse,
  SubjectResponse,
  TagsResponse,
  UsersResponse,
} from "@/generated/pocketbaseTypes";
import pb from "@/utils/pb";

export async function generateStaticPaths() {
  const subjects = await pb
    .collection(Collections.Subject)
    .getFullList<SubjectResponse>(200 /* batch size */, {
      sort: "-created",
    });

  subjects.map((s) => {
    return {
      subjectId: s.id,
    };
  });
}

async function getQuestions(subjectId: string) {
  var response: {
    questions: QuestionResponse<{
      subject_affiliation: SubjectResponse;
      user_affiliation: UsersResponse;
      tag_affiliation: TagsResponse[];
    }>[];
    error: string;
    subject?: SubjectResponse;
  } = {
    questions: [],
    error: "",
  };

  try {
    const subject = await pb
      .collection(Collections.Subject)
      .getOne<SubjectResponse>(subjectId);
    response = { subject: subject, ...response };

    const questions = await pb.collection(Collections.Question).getFullList<
      QuestionResponse<{
        subject_affiliation: SubjectResponse;
        user_affiliation: UsersResponse;
        tag_affiliation: TagsResponse[];
      }>
    >(200 /* batch size */, {
      sort: "-created",
      filter: `subject_affiliation="${subjectId}"`,
      expand: "subject_affiliation,user_affiliation,tag_affiliation",
    });

    response = { ...response, questions: questions };
  } catch (e: any) {
    response = { ...response, error: e.message };
  }

  console.log(response.questions);

  return response;
}

export default async function SubjectForum({
  params,
}: {
  params: { subjectId: string };
}) {
  const subjectId = params.subjectId;
  const { error, questions, subject } = await getQuestions(subjectId);

  return (
    <Container>
      <section className="w-full">
        <h2 className="mb-10">{subject?.name}</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 xl:gap-10">
          {error != "" && error}
          {questions.length === 0 ? (
            <div>No questions yet</div>
          ) : (
            questions.map((q) => (
              <div key={q.id}>
                <Question question={q} />
              </div>
            ))
          )}
        </div>
      </section>
    </Container>
  );
}
