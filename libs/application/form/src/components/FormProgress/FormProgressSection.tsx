import React, { FC, useRef, useState, useEffect } from 'react'
import useComponentSize from '@rehooks/component-size'

import {
  Section,
  getSubSectionsInSection,
  SubSection,
} from '@island.is/application/template'
import { BulletList, Box, Typography } from '@island.is/island-ui/core'
import SectionNumber from './components/SectionNumber'
import SubSectionItem from './components/SubSectionItem'

const SubSections: FC<{
  isActive: boolean
  subSections: SubSection[]
  activeSubSection: number
  showSubSectionIcon?: boolean
}> = ({ isActive, subSections, activeSubSection, showSubSectionIcon }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { height: activeHeight } = useComponentSize(containerRef)
  const [containerHeight, setContainerHeight] = useState<string | number>(
    'auto',
  )
  const isClient = typeof window === 'object'

  useEffect(() => {
    if (!isClient) return
    setContainerHeight((isActive && activeHeight) || 0)
  }, [activeHeight, isActive])

  return (
    <Box
      style={{
        transition: 'height .5s ease-in-out',
        height: containerHeight,
        overflowY: 'hidden',
      }}
    >
      <Box
        ref={containerRef}
        style={{
          opacity: isActive ? 1 : 0,
          transition: 'opacity .3s ease-in-out',
        }}
      >
        <BulletList>
          {subSections.map((subSection, i) => (
            <SubSectionItem
              key={`${subSection.name}-${i}`}
              currentState={
                i === activeSubSection
                  ? 'active'
                  : i < activeSubSection
                  ? 'previous'
                  : 'next'
              }
              showIcon={showSubSectionIcon}
            >
              {subSection.name}
            </SubSectionItem>
          ))}
        </BulletList>
      </Box>
    </Box>
  )
}

const FormProgressSection: FC<{
  section: Section
  sectionIndex: number
  isActive: boolean
  isComplete: boolean
  isLastSection: boolean
  activeSubSection: number
  showSubSectionIcon?: boolean
}> = ({
  section,
  sectionIndex,
  isActive,
  isComplete,
  isLastSection,
  activeSubSection,
  showSubSectionIcon = false,
}) => {
  const subSections = getSubSectionsInSection(section)
  const hasSubSections = subSections.length > 0
  const containerRef = useRef<HTMLDivElement>(null)
  const { height: activeHeight } = useComponentSize(containerRef)
  const [containerHeight, setContainerHeight] = useState(0)
  const isClient = typeof window === 'object'

  useEffect(() => {
    if (!isClient) return

    if (containerRef.current) {
      // setContainerHeight(containerRef.current.clientHeight)
      setContainerHeight(activeHeight)
    }
  }, [isActive, isClient, activeHeight])

  return (
    <Box>
      <Box ref={containerRef}>
        <Box
          display="flex"
          alignItems="flexStart"
          marginBottom={1}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Box paddingTop={2}>
            <SectionNumber
              lineHeight={isLastSection ? 0 : containerHeight}
              currentState={
                isActive ? 'active' : isComplete ? 'previous' : 'next'
              }
              number={sectionIndex + 1}
            />
          </Box>
          <Box paddingTop={2} width="full">
            <Typography
              variant={
                isActive ? 'formProgressSectionActive' : 'formProgressSection'
              }
            >
              {section.name}
            </Typography>
          </Box>
        </Box>
        {hasSubSections && (
          <SubSections
            subSections={subSections}
            activeSubSection={activeSubSection}
            showSubSectionIcon={showSubSectionIcon}
            isActive={isActive}
          />
        )}
      </Box>
    </Box>
  )
}

export default FormProgressSection
