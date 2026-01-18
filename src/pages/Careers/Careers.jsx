import React from 'react'
import ContactSection from '../../components/ContactSection/ContactSection'
import VacancyList from '../../components/Career/VacancyList'
import SEO from '../../components/SEO/SEO';
import { getBreadcrumbStructuredData } from '../../components/SEO/StructuredData';

const Careers = ({url}) => {
  const structuredData = [
    getBreadcrumbStructuredData([
      { name: 'Home', url: 'https://adamanthr.com' },
      { name: 'Careers', url: 'https://adamanthr.com/careers' }
    ])
  ];

  return (
    <div>
      <SEO
        title="Careers - Job Opportunities & Vacancies | Adamant HR"
        description="Explore career opportunities with Adamant HR. View current job openings and vacancies across various industries. Join a leading HR consulting firm in Noida, NCR."
        keywords="careers, job opportunities, vacancies, jobs in Noida, HR jobs, recruitment jobs, employment opportunities NCR"
        url="https://adamanthr.com/careers"
        structuredData={structuredData}
      />
        <VacancyList url={url} />
        {/* <Career url={url} /> */}
        <ContactSection />
    </div>
  )
}

export default Careers
