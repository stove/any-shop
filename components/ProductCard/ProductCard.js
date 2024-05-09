import Link from 'next/link';
import { CtaButton } from '../CtaButton';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import he from 'he';
const cx = classNames.bind(styles);

const ProductCard = ({ product }) => {
  const productHref = `/product/${product?.handle}`;
  //const thumbnail = product?.featuredImage?.url;
  const thumbnail = product?.image?.url;

  return (
    <li className={cx([styles.column, styles.productWrapper])}>
      <div className={styles.productImageContainer}>
        <Link href={productHref}>

            {product?.variants?.nodes[0]?.compareAtPrice ? (
              <span className={styles.onSale}>Sale</span>
            ) : null}
            <img
              className={styles.productImage}
              src={thumbnail ?? '/ProductDefault.gif'}
              alt={product?.title}
              loading="lazy"
              data-testid="product-img"
              width="234"
              height="180"
            />

        </Link>
      </div>
      <div className={styles.productInfoContainer}>
        <p className={styles.productTitle}>
          <Link href={productHref}>
            {product?.title}
          </Link>
        </p>
        <div className={styles.productPrice}>
          <span>
         {/*   {product?.variants?.nodes[0]?.compareAtPrice ? (
              <>
                <del data-testid="compare-price">
                  {priceFormatter(

                    product?.variants?.nodes[0]?.compareAtPrice?.amount,
                    product?.variants?.nodes[0]?.compareAtPrice?.currencyCode,
                  )}
                </del>{' '}
                {priceFormatter(

                  product?.variants?.nodes[0]?.price?.amount,
                  product?.variants?.nodes[0]?.price?.currencyCode,
                )}
              </>
            ) : (
              priceFormatter(

                product?.variants?.nodes[0]?.price?.amount,
                product?.variants?.nodes[0]?.price?.currencyCode,
              )
            )}*/}
            {he.decode(product?.price)}
          </span>
        </div>
        <CtaButton ctaLink={productHref} ctaLabel="View product" />
      </div>
    </li>
  );
};

export default ProductCard;
