import {MoonIcon, RepeatIcon, SunIcon, WarningIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import React, {useState} from 'react'
import {colors} from '../ui/color'
import MenuConfig from '../ui/MenuConfig'
import PerformanceDetail from './ConfigComp/PerformanceDetail'
import RecapConfig from './ConfigComp/RecapConfig'
import SelectColors from './ConfigComp/SelectColors'
import SelectedWheels from './ConfigComp/SelectedWheels'
import SelectInternColors from './ConfigComp/SelectInternColors'
import SliderConfig from './ConfigComp/SliderConfig'
import dynamic from 'next/dynamic'

const CanvasModel = dynamic(
  () => import('./ConfigComp/threeComp/CanvasModel'),
  {
    ssr: false,
  },
)

export default function Configurateur({
  car,
  setSelectedCar,
  model3,
  selectedCar,
  selectedColor,
  state,
  setSelectedColor,
  listImage,
  setSliderIndex,
  setSelectedInternColor,
  setProgress,
}) {
  const [threeSelect, setThreeSelect] = useState(false)
  const [lightOn, setLightOn] = useState(false)
  const SelectCar = ({carNb}) => {
    return (
      <Flex
        w={'full'}
        border={'1px solid #00000050'}
        boxShadow={
          carNb === state.selectedCar
            ? `0 0 0 3px ${colors.blue}`
            : `0 0 0 0px ${colors.blue}`
        }
        transition={'0.5s'}
        onClick={() => setSelectedCar(carNb)}
        justifyContent="space-between"
        alignItems={'center'}
        p={2}
        borderRadius={3}
        h={'50px'}
        cursor="pointer"
      >
        <Text variant={'menuLink'}> {model3[carNb]?.model}</Text>
        <Text variant={'menuLink'}> {model3[carNb]?.price}</Text>
      </Flex>
    )
  }
  return (
    <>
      <MenuConfig />
      <Flex
        flexDirection={{base: 'column', lg: 'row'}}
        w={'100vw'}
        maxH={{base: '100vh', lg: '100vh'}}
        minH={'100vh'}
        overflowY={{base: 'hidden'}}
      >
        <Flex
          w={{base: '100%', lg: 'full'}}
          h={{base: '35vh', md: '100vh'}}
          objectFit="cover"
          position={'relative'}
        >
          {/* button removed due to unfixed error issue. */}
          {/* <IconButton
            position={'absolute'}
            top={20}
            right={'50px'}
            zIndex={20}
            icon={<RepeatIcon />}
            onClick={() => setThreeSelect(!threeSelect)}
          /> */}
          <RecapConfig state={state} />
          {threeSelect ? (
            <>
              {state?.progressModel === 100 ? (
                ''
              ) : (
                <Box
                  position={'aboslute'}
                  top={'50%'}
                  left={'50%'}
                  transform={'translate(-50%,-50%'}
                  color={'black'}
                  zIndex={99999}
                >
                  <IconButton
                    position={'absolute'}
                    top={20}
                    right={'100px'}
                    zIndex={20}
                    icon={lightOn ? <MoonIcon /> : <SunIcon />}
                    onClick={() => setLightOn(!lightOn)}
                  />
                  <Heading>{state?.progressModel}</Heading>
                </Box>
              )}

              <CanvasModel
                setProgress={setProgress}
                state={state}
                lightOn={lightOn}
              />
            </>
          ) : (
            <SliderConfig
              listImage={listImage}
              setSliderIndex={setSliderIndex}
              state={state}
            />
          )}
        </Flex>
        <Flex
          w={{base: '100%', lg: '600px'}}
          h={{base: '65vh', md: '100vh'}}
          overflowY={{base: 'auto', lg: 'scroll'}}
          p={5}
          px={10}
          pb={{base: '100px'}}
          flexDirection={'column'}
          alignItems="center"
          gap={'60px'}
          pt={{base: '30px', md: '100px'}}
        >
          <Flex boxShadow={'lg'} h={'auto'} p={3}>
            <WarningIcon pt={2} boxSize={7} color={'#3E6AE1'} />
            <Text fontSize={'sm'}>
            Model 3 Dual Motor vehicles qualify for a federal tax credit for eligible buyers. Reductions likely after Dec 31.
            </Text>
          </Flex>
          <Flex flexDirection={'column'} alignItems="center">
            <Heading variant={'headModel'}>Model 3</Heading>
            <Text variant={'lightSubtile'}>
              Est. Delivery: Oct – Nov 2023
            </Text>
          </Flex>
          <Flex flexDirection={'row'} alignItems="flex-start" gap={7}>
            <Flex flexDirection={'column'}>
              <Flex
                flexDirection={'row'}
                alignItems={'flex-end'}
                justifyContent="center"
              >
                <Text variant={'mediumFont'}>{car?.autonomie}</Text>
                <Text variant={'smallFont'}>Km</Text>
              </Flex>
              <Flex
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent="center"
                h={'50px'}
              >
                <Text variant={'tinyFont'}>Autonomy</Text>
                <Text variant={'tinyFont'}>(WLTP)</Text>
              </Flex>
            </Flex>
            <Flex flexDirection={'column'}>
              <Flex
                flexDirection={'row'}
                alignItems={'flex-end'}
                justifyContent="center"
              >
                <Text variant={'mediumFont'}>{car?.vitesse}</Text>
                <Text variant={'smallFont'}>Km/h</Text>
              </Flex>
              <Flex
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent="center"
                h={'50px'}
              >
                <Text variant={'tinyFont'}>Top</Text>
                <Text variant={'tinyFont'}>Speed</Text>
              </Flex>
            </Flex>
            <Flex flexDirection={'column'}>
              <Flex
                flexDirection={'row'}
                alignItems={'flex-end'}
                justifyContent="center"
              >
                <Text variant={'mediumFont'}>{car?.zerocent}</Text>
                <Text variant={'smallFont'}>s</Text>
              </Flex>
              <Flex
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent="center"
                h={'50px'}
              >
                <Text variant={'tinyFont'} textAlign="cetner">
                  0 - 100 km/h
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDirection={'column'} w={'100%'} gap={4}>
            <Text variant={'menuLink'}>Rear-Wheel Drive</Text>
            <SelectCar carNb={0} />
            <Text variant={'menuLink'}>Dual Motor All-Wheel Drive</Text>
            <SelectCar carNb={1} />
            <SelectCar carNb={2} />
            <Flex flexDirection={'column'} alignItems="center">
              <Text textAlign={'center'} variant={'nolinkText'}>
                Tesla Vehicles
              </Text>
              <Text textAlign={'center'} variant={'linkText'} mt={-1}>
                belongs to energy Class A{' '}
              </Text>
              <Text textAlign={'center'} variant={'nolinkText'}>
                in terms of CO2 emissions.
              </Text>
              <Button mt={5} variant={'btnSmall'}>
                Feature Details
              </Button>
            </Flex>
          </Flex>
          {state?.selectedCar === 2 ? <PerformanceDetail /> : ''}{' '}
          <Flex
            flexDirection={'column'}
            alignItems="center"
            gap={5}
            my={'50px'}
          >
            <Heading variant={'headModelsub'}>Paint</Heading>
            <SelectColors
              selectedCar={selectedCar}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              state={state}
            />
          </Flex>
          <Flex
            flexDirection={'column'}
            alignItems="center"
            gap={5}
            my={'50px'}
          >
            <Heading variant={'headModelsub'}>Wheels</Heading>
            <SelectedWheels
              selectedCar={selectedCar}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              state={state}
            />
          </Flex>
          <Flex
            flexDirection={'column'}
            alignItems="center"
            gap={5}
            my={'50px'}
          >
            <Heading variant={'headModelsub'}>Interior</Heading>
            <SelectInternColors
              selectedCar={selectedCar}
              setSelectedInternColor={setSelectedInternColor}
              selectedColor={selectedColor}
              state={state}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
