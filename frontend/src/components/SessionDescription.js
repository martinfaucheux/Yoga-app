import { Box, VStack, Heading, Text } from "@chakra-ui/react";

const JustifiedText = (props) => <Text textAlign="justify" {...props} />;
const SmallHeading = (props) => <Heading ml={1} size="md" {...props} />;

const fromMarkdown = (content) => {
  console.log(content);
  content.split("\n").map((line, index) => {
    if (line.trim() === "") {
      return null;
    } else if (line.startsWith("#")) {
      return (
        <SmallHeading key={index}>{line.substring(1).trim()}</SmallHeading>
      );
    } else {
      return <JustifiedText key={index}>{line}</JustifiedText>;
    }
  });
};

const SessionDescription = () => (
  <Box ml={10}>
    <Heading mb={10} align="center">
      🌿 Hatha Yoga Annecy Lake 🌊
    </Heading>
    <VStack spacing={5} mb={10} align="flex-start" justify="flex-start">
      <JustifiedText>
        Are you seeking a harmonious escape from the demands of everyday life?
        Picture yourself in the embrace of nature's tranquility, surrounded by
        the pristine beauty of Annecy Lake. In the heart of this breathtaking
        landscape, we invite you to embark on a journey of self-discovery and
        well-being through our rejuvenating Hatha yoga class.
      </JustifiedText>
      <SmallHeading>🧘‍♀️ The Art of Hatha Yoga</SmallHeading>
      <JustifiedText>
        Hatha yoga, the ancient practice that unites body, mind, and breath,
        offers a pathway to holistic wellness. With a focus on gentle,
        deliberate movements and deep breathing, Hatha yoga helps you cultivate
        a profound sense of balance, both within yourself and within the natural
        world around you.
      </JustifiedText>
      <SmallHeading>🌅 Morning Radiance</SmallHeading>
      <JustifiedText>
        As the sun rises over the glistening waters of Annecy Lake, our Hatha
        yoga class provides the perfect start to your day. Each session begins
        with a few moments of mindful reflection, allowing you to connect with
        the serene surroundings and set your intentions for the practice ahead.
      </JustifiedText>
      <SmallHeading>🌱 Nurturing Body and Soul</SmallHeading>
      <JustifiedText>
        Our experienced instructors guide you through a series of asanas (poses)
        that promote flexibility, strength, and a heightened sense of awareness.
        Whether you're a beginner or a seasoned yogi, our classes are
        thoughtfully designed to accommodate all levels, ensuring everyone can
        experience the benefits of this ancient practice.
      </JustifiedText>
      <SmallHeading>🌬️ Breath as Your Anchor</SmallHeading>
      <JustifiedText>
        Hatha yoga places great emphasis on the breath. Through pranayama
        (breath control) techniques, you'll learn to synchronize your breath
        with movement, fostering a deep sense of relaxation and presence. The
        rhythmic sound of your breath becomes a calming melody, as you let go of
        stress and tension.
      </JustifiedText>
      <SmallHeading>🍃 Connection to Nature</SmallHeading>
      <JustifiedText>
        Annecy Lake, with its crystalline waters and lush surroundings, serves
        as the backdrop for your practice. Imagine the gentle breeze carrying
        the scent of the lake as you move through each asana, grounding your
        practice in the beauty of the natural world.
      </JustifiedText>
      <SmallHeading>🌸 A Journey Inward</SmallHeading>
      <JustifiedText>
        Beyond the physical benefits, our Hatha yoga classes encourage inner
        exploration. Through moments of meditation and mindful stillness, you'll
        find yourself reconnecting with your innermost thoughts and emotions,
        fostering a sense of inner peace that extends beyond the mat.
      </JustifiedText>
      <SmallHeading>✨ Join Us by the Lake</SmallHeading>
      <JustifiedText>
        As the sun warms your skin and the waves lap at the shore, join us for a
        Hatha yoga class that harmonizes body, mind, and nature. Whether you're
        a local resident or a visitor seeking a unique wellness experience, our
        classes are open to all who wish to embrace the transformative power of
        yoga by the tranquil Annecy Lake.
      </JustifiedText>
      <SmallHeading>📅 Class Schedule</SmallHeading>
      <JustifiedText>
        Our classes are held on select mornings, allowing you to start your day
        in a state of calm vitality. Check our website or contact us to find out
        more about our class schedule and how to reserve your spot by the lake.
      </JustifiedText>
      <JustifiedText>
        Rediscover your inner balance and vitality by the shores of Annecy Lake.
        Immerse yourself in the soothing embrace of nature and the
        transformative practice of Hatha yoga. Your journey toward well-being
        begins here.
      </JustifiedText>
    </VStack>
  </Box>
);

export default SessionDescription;
