import { ArchivesComponent, CoverWithNavigationComponent } from '../../components/components';
import { Archive } from '../../models/models';

export const Renderer: React.FunctionComponent<{
  archives: Array<Archive>
}> = ({ archives }) => {
  return (
    <>
      <CoverWithNavigationComponent
        contentCover={{
          title: "Archives",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        {/* TODO: implement search conditions component */}
        <ArchivesComponent
          archives={archives}
        />
      </main>
    </>
  )
}
