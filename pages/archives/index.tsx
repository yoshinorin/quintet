// TODO: refactor
import Error from 'next/error';
import HeadMeta from '../../components/headmeta';
import Cover from '../../components/cover';
import ArchivesComponent from '../../components/archives';
import { getArchives } from '../api/archives';
import { convertUnixtimeToDate } from '../../utils/time';
import { Archive, ArchiveResponse } from '../../types/archive';

export default function Page({ statusCode, archives }) {
  if (statusCode !== 200) {
    // TODO: Custom ErrorPage
    return <Error statusCode={archives} />
  }
  return (
    <>
      <HeadMeta/>
      <Cover />
      <main>
        {/* TODO: implement search conditions component */}
        <ArchivesComponent
          archives={archives}
        />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const response: Response = await getArchives()
  ctx.res.statusCode = response.status;

  let archiveResponse: Array<ArchiveResponse> = null;
  let archives: Array<Archive> = [];
  if (response.status === 200) {
    archiveResponse = await response.json() as Array<ArchiveResponse>;
    archives = archiveResponse.map(article => {
      return {
        path: article.path,
        title: article.title,
        publishedAt: convertUnixtimeToDate(article.publishedAt).toLocaleString()
      } as Archive
    });
  }

  return {
    props: {
      statusCode: response.status,
      archives: archives
    }
  }
}
