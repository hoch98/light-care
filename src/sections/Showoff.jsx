import PartsShowoff from '../components/PartsShowoff';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { Text, Box } from '@chakra-ui/react';

function Showoff() {
  const { width } = useWindowDimensions();

  return (
    <section
      className="parts-showoff-section"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: width > 1200 ? 'row' : 'column',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <Box flex={width > 1200 ? 1 : 'unset'}>
        <PartsShowoff width={width} />
      </Box>

      <Box flex={width > 1200 ? 1 : 'unset'} width={"80%"}>
        <Text
          fontSize={width > 1200 ? '2.5rem' : '2rem'}
          fontWeight="bold"
          mb="1rem"
        >
          Raspberry Pi
        </Text>
        <Text
          fontSize={width > 1200 ? '1.25rem' : '1rem'}
          lineHeight="taller"
        >
          A Raspberry Pi is a credit-card-sized, low-cost computer designed to promote computer science education,
          but it's now used for a wide range of projects from simple computing to complex robotics.
          It runs an operating system like Raspberry Pi OS (a version of Linux) on an ARM processor,
          has components similar to a PC, and connects to external devices like monitors, keyboards, and mice.
          Its GPIO pins make it ideal for physical computing and the Internet of Things (IoT).
        </Text>
      </Box>
    </section>
  );
}

export default Showoff;
