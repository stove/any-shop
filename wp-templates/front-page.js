import { gql } from '@apollo/client';
import {
  ContentWrapper,
  Footer,
 HeaderSD,
  Main,
  NavigationMenu,
  ProductSection,
  PromoSection,
  SEO,
  TestimonialsSection,
} from '../components';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import * as MENUS from '../constants/menus';

export default function Component(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings ?? {};
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { content } = props?.data?.page ?? { title: '' };

  const latestProducts = props?.products?.slice(0, 4);
  console.log("latsestProducts = ", JSON.stringify(latestProducts));
  const saleProducts = props?.products?.filter((product) => {
    return product.variants?.nodes[0]?.compareAtPrice !== null;
  });

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <HeaderSD
        // title={siteTitle}
        title='Support Design - Stolar med kvalitet'
        // description={siteDescription}
        description='Kvalitetshantverk från Sunne i Värmland'
        menuItems={primaryMenu}
      />
      <Main>
        <ContentWrapper content={content} />
        <ProductSection heading="Sadelstolar" products={latestProducts} />
        <TestimonialsSection />
        <ProductSection heading="Sadelstolar med rygg" products={saleProducts} />
        <PromoSection
          showCta
          ctaLink="/about"
          ctaLabel="About"
          title="Call To Action Area"
          description="Använd denna komponent för att promota artiklar och lägg till en CTA nedanför"
        />
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
