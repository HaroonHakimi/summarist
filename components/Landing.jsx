import LoginModal from "./modals/LoginModal";

export default function Landing() {
  return (

  <section id="landing">
    <div class="container">
      <div class="row">
        <div class="landing__wrapper">
          <div class="landing__content">
            <div class="landing__content__title">
              Gain more knowledge <br class="remove--tablet" />
              in less time
            </div>
            <div class="landing__content__subtitle">
              Great summaries for busy people,
              <br class="remove--tablet" />
              individuals who barely have time to read,
              <br class="remove--tablet" />
              and even people who don’t like to read.
            </div>
            <LoginModal/>
          </div>
          <figure class="landing__image--mask">
            <img src="/assets/landing.png" alt="landing" />
          </figure>
        </div>
      </div>
    </div>
  </section>
  )
}
