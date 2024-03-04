import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <IconButton
      size="sm"
      fontSize="1.4rem"
      variant="ghost"
      color="current"
      marginLeft=""
      onClick={toggleColorMode}
      icon={<SwitchIcon width={"1.4rem"} height={"1.4rem"} />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}
