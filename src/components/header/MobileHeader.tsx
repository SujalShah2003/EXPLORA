import { Box, Button, Divider, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import { CONTENT } from "@/constants";
import styles from "./WebHeader.module.css";

const { navLinks, exploreProducts } = CONTENT.header;

type MobileHeaderProps = {
  close: () => void;
};

const MobileHeader = ({ close }: MobileHeaderProps) => {
  return (
    <Stack h="100%" justify="space-between" py="md">
      {/* Navigation */}
      <Stack gap="xs">
        {navLinks.map((link) => (
          <Button
            key={link.label}
            component={Link}
            to={link.href}
            variant="subtle"
            color="dark"
            justify="flex-start"
            fullWidth
            size="md"
            className={`${styles.authButton} ${styles.signInButton}`}
            onClick={close}
          >
            {link.label}
          </Button>
        ))}
      </Stack>

      {/* Bottom Actions */}
      <Box>
        <Divider mb="md" />

        <Stack gap="sm">

          <Button
            component={Link}
            to={exploreProducts.href}
            fullWidth
            size="md"
            leftSection={<FiCompass size={16} />}
            onClick={close}
          >
            {exploreProducts.label}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default MobileHeader;
