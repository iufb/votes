import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { QueryProvider } from "../components/shared/QueryProvider";
import { theme } from "../theme";

export const metadata = {
  title: "Vote",
  description: "Show vote result app",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="kz" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <QueryProvider>{children}</QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
