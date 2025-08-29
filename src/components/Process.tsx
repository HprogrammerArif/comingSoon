import NoteImg from "@/assets/note-1.svg";
import MessageImg from "@/assets/message-2.svg";
import BadgeImg from "@/assets/badge-3.svg";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section className=" py-12 lg:py-28 xl:py-32">
      <div className="container mx-auto flex flex-col gap-10 lg:gap-14 items-center">
        <SectionHeading title="Comment ça marche?" />

        <div className="w-full grid md:grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-5 items-center px-6">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2 items-center">
              <img src={NoteImg} alt="Note Image" className="max-w-full" />

              <h5 className="text-lg font-semibold text-primaryDark">
                Publiez votre demande
              </h5>
            </div>

            <p className="text-base text-[##404C67]">
              Décrivez gratuitement vos besoins (ménage, réparation, rénovation,
              déménagement, etc.) en quelques clics.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2 items-center">
              <img
                src={MessageImg}
                alt="Message Image"
                className="max-w-full"
              />

              <h5 className="text-lg font-semibold text-primaryDark">
                Recevez des offres
              </h5>
            </div>

            <p className="text-base text-[##404C67]">
              Plusieurs professionnels de confiance au Maroc vous envoient
              rapidement leurs propositions.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2 items-center">
              <img src={BadgeImg} alt="Badge Image" className="max-w-full" />

              <h5 className="text-lg font-semibold text-primaryDark">
                Comparez et choisissez
              </h5>
            </div>

            <p className="text-base text-[##404C67]">
              Comparez les offres et sélectionnez le professionnel qui vous
              inspire le plus de confiance.
            </p>
          </div>
        </div>

        {/* <Link to="/post-job">
          <Button>Post job</Button>
        </Link> */}
      </div>
    </section>
  );
}
