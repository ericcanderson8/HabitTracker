"use client"; // MUST be the first line

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correct import
import styles from './sidebar.module.css';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/user/dashboard', label: 'Dashboard' },
  { href: '/user/chatbot', label: 'Chatbot' },
  { href: '/contact', label: 'Contact' },
];

export default function Sidebar() {
  const pathname = usePathname(); // Correct hook

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.activeLink : '' // Use pathname here
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}