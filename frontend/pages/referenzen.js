import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items(orderBy: createdAt_DESC) {
      id
      title
      author
      year
      description
      publisher
      fiction
      image
      largeimage
    }
  }
`;

const Referenzen = props => (
  <div>
    <h1>Referenzen</h1>
    <h2>Berufserfahrung</h2>
    <p>
      Selbstständige Übersetzerin seit 1986, langjährige Tätigkeit als
      Sekretärin bei McKinsey & Co., Freshfields Bruckhaus Deringer LLP und der
      heilpädagogischen, anthroposophischen Raphael-Schule Bad Aibling
    </p>
    <h2>Übersetzungen</h2>
    <h3>Belletristik/Literarische Texte</h3>
    <ul>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message} </p>;
          const item = data.item;
          return data.items.map(item => {
            if (item.fiction == true)
              return (
                <li>
                  {" "}
                  <Link
                    href={{
                      pathname: "/item",
                      query: { id: item.id }
                    }}
                  >
                    <a>
                      {item.author}, „{item.title}“, {item.publisher},{" "}
                      {item.year}
                    </a>
                  </Link>{" "}
                </li>
              );
          });
        }}
      </Query>
      <li>Neville Thompson, „Wildes Leben“, Heyne, 2001</li>
      <li>Anne Perry, „Die Rettung des Königs“, Heyne, 2000</li>
      <li>Catherine Coulter, „Schloss der Liebe“, Heyne, 2000</li>
      <li>Cathy Dubowski, „Ungeküsst – Das Buch zum Film“, Heyne, 1999</li>
      <li>
        Olmos, „Die Frau im Sand“, Anthologie Lateinamerikanischer Autorinnen,
        Heyne, 1995 (aus dem Spanischen)
      </li>
    </ul>

    <h3>Sachbücher</h3>
    <ul>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message} </p>;
          const item = data.item;
          return data.items.map(item => {
            if (item.fiction == false)
              return (
                <li>
                  {" "}
                  <Link
                    href={{
                      pathname: "/item",
                      query: { id: item.id }
                    }}
                  >
                    <a>
                      {item.author}, „{item.title}“, {item.publisher},{" "}
                      {item.year}
                    </a>
                  </Link>{" "}
                </li>
              );
          });
        }}
      </Query>
      <li>
        „Italiens kulinarische Landschaften – Rom und Latium“, Christian Verlag,
        2000 (zusammen mit anderen Übersetzern)
      </li>
      <li>
        „Italiens kulinarische Landschaften – Venedig und Veneto“, Christian
        Verlag, 2000
      </li>
      <li>
        „Italiens kulinarische Landschaften – Piemont“, Christian Verlag, 1999
      </li>
      <li>„Sizilianisches Kochbuch“, Christian Verlag, 1999</li>
      <li>„Einladung zum Aperitif“, Christian Verlag, 1998</li>
      <li>
        APA-Guide „Südamerika“ (zusammen mit anderen Übersetzern) APA-Guide
        „Barbados“ (Reiseführer), 1990
      </li>
      <li>„Mädchen oder Junge?“, Econ-Verlag, 1987</li>
      <li>„Natürlich Stillen“, Econ-Verlag, 1986</li>
    </ul>

    <h3>Juristische Fachtexte </h3>
    <p>
      Dokumente und Urkunden Beglaubigung von Übersetzungen der Sprachenrichtung
      Deutsch-Spanisch und umgekehrt Wirtschaftstexte, technische Texte
      Angebote, Angebotseinholungen Firmenbroschüren (z. B. Crown Simplimatic,
      1998) Mitarbeit an technischen Handbüchern (Luftfahrt: Mc Donnell Douglas
      für DASA) Fachtexte für die Pharma-Industrie
    </p>
  </div>
);

export default Referenzen;
