import { ArchivesComponent, CoverComponent } from '../../components/components';
import { Archive } from '../../models/models';

export const Renderer: React.FunctionComponent<{
  archives: Array<Archive>
}> = ({ archives }) => {
  return (
    <>
      <CoverComponent
        contentCover={{
          title: "Archives",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <ArchivesComponent
          archives={archives}
        />
      </main>
    </>
  )
}
