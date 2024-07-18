import { Button } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  withIconRight?: ReactElement;
}

export const IconButton = ({
  icon,
  disabled = false,
  onClick,
  withIconRight,
}: IProps) => {
  return (
    <Button
      color="white"
      disabled={disabled}
      onClick={onClick}
      variant="solid"
      bgColor="btn-primary"
      p={2}
      rounded="xl"
      rightIcon={withIconRight}
      _hover={{ bg: "divider" }}>
      {icon}
    </Button>
  );
};
