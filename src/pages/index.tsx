import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

const activities = [
  {
    title: "はじめてのプログラミング教室",
    coverImage: {
      src: "https://source.unsplash.com/hLvQ4-QEBAE/800x300",
      alt: "ブロックプログラミング",
    },
    description:
      // prettier-ignore
      <p>
        「はじめてのプログラミング教室」は ut.code(); がこれまでの学園祭でも提供してきた、自慢のコンテンツです。
        ブロックを並べて、積み木感覚で、誰でも簡単にプログラミングに触れることができます。
        でも最適化するとなると大人でも大変……。ぜひ挑戦していってください！
      </p>,
    linkTo: "https://festival.utcode.net/",
  },
  {
    title: "Code vs Code",
    coverImage: {
      src: "https://source.unsplash.com/yWGiyL8DSys/800x300",
      alt: "プログラムを書いて戦う様子",
    },
    description:
      // prettier-ignore
      <p>
        ブロックをならべて、つなげて、自分だけのパイロット AI をプログラムしよう！
        作ったプログラムで、企画に参加してくださった他の皆さんと対戦できます。
        最強 AI の座を手にするのは一体誰だ！？
      </p>,
    linkTo: "https://code-vs-code.utcode.net/",
  },
  {
    title: "ハッカーになろう",
    coverImage: {
      src: "https://source.unsplash.com/FnA5pAzqhMM/800x300",
      alt: "セキュリティのイメージ",
    },
    description:
      // prettier-ignore
      <p>
        悪用厳禁！Web サービスを攻撃して、隠された秘密のデータを盗み出そう！
        実際に使われたことのあるサイバー攻撃手法を習得して、あなたもついにハッカーデビュー！？
        インターネット上の詐欺から身を守る方法も学べます。
      </p>,
    linkTo: "/security",
  },
  {
    title: "CreateCPU",
    coverImage: {
      src: "https://source.unsplash.com/_LIZ36OHGKk/800x300",
      alt: "CPU のイメージ",
    },
    description:
      // prettier-ignore
      <p>
        皆さんの持つパソコンやスマートフォンは、私たちが手で計算するよりもずっと高速に計算を行うことができます。
        これは、私たちの脳に相当する CPU と呼ばれる部品が、計算を高速に行っているからです。
        高速な CPU を製造するには高度な技術が必要ですが、CPU の理論的背景自体は、実はとてもシンプルです。
        足し算を行う論理回路を作りながら、CPU の仕組みを学んでいきましょう。
      </p>,
    linkTo: "/create-cpu",
  },
  {
    title: "暗号技術について学ぼう！",
    coverImage: {
      src: "https://source.unsplash.com/iar-afB0QQw/800x300",
      alt: "暗号のイメージ",
    },
    description:
      // prettier-ignore
      <p>
        暗号技術は、現代社会において欠かせないものとなっています。
        ここでは、エニグマという第二次世界大戦で実際に使われていた暗号のしくみと、
        現代の暗号技術の基礎である RSA 暗号を学びます。
      </p>,
    linkTo: "/crypto",
  },
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <header className="hero hero--primary">
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main className="container padding-vert--lg">
        <ul
          className="row row--no-gutters"
          style={{
            padding: 0,
            listStyleType: "none",
          }}
        >
          {activities.map((activity) => (
            <li key={activity.title} className="col col--6 padding--md">
              <div className="card" style={{ height: "100%" }}>
                <div className="card__image">
                  <img
                    style={{ width: "100%" }}
                    src={activity.coverImage.src}
                    alt={activity.coverImage.alt}
                  />
                </div>
                <div className="card__body">
                  <h3>{activity.title}</h3>
                  {activity.description}
                </div>
                <div className="card__footer">
                  <a
                    href={activity.linkTo}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--primary button--block"
                  >
                    この企画を体験する
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
