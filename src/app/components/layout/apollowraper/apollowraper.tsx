'use client'; // <<<<<<< ЦЕ КРИТИЧНО ВАЖЛИВО!

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo'; // Імпортуємо ваш ApolloClient інстанс

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}