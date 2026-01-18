import React from 'react'
import { useParams } from 'react-router-dom'
import Career from '../../components/Career/Career'
import SEO from '../../components/SEO/SEO';

const Apply = ({url}) => {
  const { id } = useParams()
  return (
    <>
      <SEO
        title="Apply for Job - Career Opportunities | Adamant HR"
        description="Apply for job openings at Adamant HR. Submit your application for various positions across industries. Join a leading HR consulting firm in Noida, NCR."
        keywords="apply for job, job application, career application, jobs in Noida, employment application"
        url={`https://adamanthr.com/careers/apply/${id}`}
      />
      <Career url={url} jobId={id} />
    </>
  )
}

export default Apply
