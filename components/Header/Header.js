import { useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { FaBars, FaSearch } from 'react-icons/fa';
import {
  Container,
  NavigationMenu,
  SkipNavigationLink,
} from '../../components';
import styles from './Header.module.scss';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const CartQuickView = dynamic(() => import('./CartQuickView'), { ssr: false });

let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  const navClasses = cx([
    styles['primary-navigation'],
    isNavShown ? styles['show'] : undefined,
  ]);

  return (
    <header className={styles.component}>
      <SkipNavigationLink />
      <Container>
        <div className={styles.bar}>
          <div className={styles.logo}>
            <Link href="/" title="Home">
              <Image
                src="/assets/img/logo-1-416x122.png" // Note the path starts from the base of the 'public' directory
                alt="Description"
                width={208} // Set the desired width
                height={60} // Set the desired height
                layout="intrinsic"
              />
                <h3>{title}</h3>
                <span>{description}</span>

            </Link>
          </div>

          <div className={styles.search}>
            <Link href="/search">
                <FaSearch title="Search" role="img" />
            </Link>
          </div>

          <button
            type="button"
            className={styles['nav-toggle']}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={styles['primary-navigation']}
            aria-expanded={isNavShown}
          >
            <FaBars />
          </button>
        </div>

        <div className={styles['nav-cart-bar']}>
          <NavigationMenu
            id={styles['primary-navigation']}
            className={navClasses}
            menuItems={menuItems}
          ></NavigationMenu>

          <CartQuickView styles={styles} />
        </div>
      </Container>
    </header>
  );
}
