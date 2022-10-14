import { useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import Pagination from '../../../components/Pagination/Pagination';
import Table from '../../../components/Table/Table';
import { useRouter } from 'next/router'


import { contributionsTableColumns } from '../../../config/table';

const contribData = [{"id":1,"login":"Igor","line_count":913},
{"id":2,"login":"Sheeree","line_count":814},
{"id":3,"login":"Erhart","line_count":432},
{"id":4,"login":"Modestia","line_count":689},
{"id":5,"login":"Waldemar","line_count":213},
{"id":6,"login":"Meggi","line_count":431},
{"id":7,"login":"Marya","line_count":250},
{"id":8,"login":"Eugenio","line_count":196},
{"id":9,"login":"Babita","line_count":468},
{"id":10,"login":"Tabb","line_count":99},
{"id":11,"login":"Austen","line_count":139},
{"id":12,"login":"Codie","line_count":855},
{"id":13,"login":"Rosemaria","line_count":282},
{"id":14,"login":"Ginelle","line_count":78},
{"id":15,"login":"Ricki","line_count":391},
{"id":16,"login":"Doralia","line_count":838},
{"id":17,"login":"Tess","line_count":680},
{"id":18,"login":"Maurise","line_count":332},
{"id":19,"login":"Kary","line_count":985},
{"id":20,"login":"Stacy","line_count":353},
{"id":21,"login":"Carree","line_count":219},
{"id":22,"login":"Devland","line_count":978},
{"id":23,"login":"Kyrstin","line_count":127},
{"id":24,"login":"Saraann","line_count":189},
{"id":25,"login":"Eadith","line_count":508},
{"id":26,"login":"Artair","line_count":156},
{"id":27,"login":"Andrea","line_count":874},
{"id":28,"login":"Edie","line_count":913},
{"id":29,"login":"Giorgia","line_count":312},
{"id":30,"login":"Elisa","line_count":282},
{"id":31,"login":"Gifford","line_count":676},
{"id":32,"login":"Ashli","line_count":913},
{"id":33,"login":"Stesha","line_count":383},
{"id":34,"login":"Luella","line_count":183},
{"id":35,"login":"Berk","line_count":411},
{"id":36,"login":"Shayne","line_count":670},
{"id":37,"login":"Margarette","line_count":255},
{"id":38,"login":"Lisette","line_count":176},
{"id":39,"login":"Christine","line_count":559},
{"id":40,"login":"Andriana","line_count":920},
{"id":41,"login":"Clerissa","line_count":853},
{"id":42,"login":"Wynne","line_count":106},
{"id":43,"login":"Anatollo","line_count":883},
{"id":44,"login":"Mel","line_count":148},
{"id":45,"login":"Franni","line_count":896},
{"id":46,"login":"Benjy","line_count":307},
{"id":47,"login":"Angelita","line_count":622},
{"id":48,"login":"Halli","line_count":516},
{"id":49,"login":"Celinda","line_count":691},
{"id":50,"login":"Jarvis","line_count":783},
{"id":51,"login":"Holmes","line_count":341},
{"id":52,"login":"Cinda","line_count":145},
{"id":53,"login":"Cherilynn","line_count":550},
{"id":54,"login":"Josias","line_count":611},
{"id":55,"login":"Burtie","line_count":360},
{"id":56,"login":"Stephanus","line_count":495},
{"id":57,"login":"Jemie","line_count":728},
{"id":58,"login":"Essy","line_count":774},
{"id":59,"login":"Bo","line_count":270},
{"id":60,"login":"Anthia","line_count":945},
{"id":61,"login":"Annetta","line_count":775},
{"id":62,"login":"Olympie","line_count":516},
{"id":63,"login":"Rik","line_count":214},
{"id":64,"login":"Parsifal","line_count":331},
{"id":65,"login":"Steffen","line_count":999},
{"id":66,"login":"Reinald","line_count":307},
{"id":67,"login":"Gerek","line_count":879},
{"id":68,"login":"Winnie","line_count":469},
{"id":69,"login":"Madeline","line_count":843},
{"id":70,"login":"Rorke","line_count":857},
{"id":71,"login":"Devy","line_count":735},
{"id":72,"login":"Stacy","line_count":390},
{"id":73,"login":"Ruby","line_count":679},
{"id":74,"login":"Karyn","line_count":884},
{"id":75,"login":"Gottfried","line_count":107},
{"id":76,"login":"Suzy","line_count":335},
{"id":77,"login":"Marcella","line_count":609},
{"id":78,"login":"Bentley","line_count":432},
{"id":79,"login":"Ailyn","line_count":901},
{"id":80,"login":"Lianne","line_count":856},
{"id":81,"login":"Jobye","line_count":901},
{"id":82,"login":"Cathlene","line_count":134},
{"id":83,"login":"Winny","line_count":802},
{"id":84,"login":"Rozina","line_count":423},
{"id":85,"login":"Hildegarde","line_count":955},
{"id":86,"login":"Tanya","line_count":453},
{"id":87,"login":"Arleen","line_count":74},
{"id":88,"login":"Aylmar","line_count":497},
{"id":89,"login":"Tory","line_count":392},
{"id":90,"login":"Joshua","line_count":318},
{"id":91,"login":"Trumaine","line_count":687},
{"id":92,"login":"Karlotta","line_count":350},
{"id":93,"login":"Vanya","line_count":160},
{"id":94,"login":"Pierre","line_count":569},
{"id":95,"login":"Karyn","line_count":582},
{"id":96,"login":"Chickie","line_count":730},
{"id":97,"login":"Harmonie","line_count":323},
{"id":98,"login":"Bunny","line_count":904},
{"id":99,"login":"Nelson","line_count":892},
{"id":100,"login":"Conrad","line_count":934}]

export default function Contributions() {
  const router = useRouter()
  const { id } = router.query

  // const [users, setUsers] = useState(users);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contribsPerPage] = useState(10);


  // Get current posts
  const indexOfLastUser = currentPage * contribsPerPage;
  const indexOfFirstUser = indexOfLastUser - contribsPerPage;
  const currentContribs = contribData.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Layout pageTitle={`Repository #${id}`} subtitle='Contributions' center={true}>
      <Table
        columns={contributionsTableColumns}
        list={currentContribs}
      />
      <Pagination
        itemsPerPage={contribsPerPage}
        totalItems={contribData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Layout>
  );
}
