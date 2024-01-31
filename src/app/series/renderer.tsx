import { CoverComponent, SeriesComponent } from '../../components/components';
import { Series } from '../../models/models';

export const Renderer: React.FunctionComponent<{
  series: Array<Series>
}> = ({ series }) => {
  return (
    <>
      <CoverComponent
        props={{
          title: "Series",
          tags: null,
          publishedAt: null,
        }}
      />
      <main>
        <SeriesComponent
          series={series}
        />
      </main>
    </>
  )
}
