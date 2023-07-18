Profile old code .same file all components are there (button,textfield)........



import Header from '@/components/Header/Header'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Typography,
} from '@mui/joy'
import Styles from './profile.module.scss'
import Image from 'next/image'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import useLoginData from '@/Store/LoginData'
import CommonStyles from '@/styles/Common.module.scss'
import FormInputText from '@/components/FormFileds/FormInputText/FormInputText'
import { useState, useRef } from 'react'
import JButton from '@/components/Button/JButton/JButton'
import FormInputTextarea from '@/components/FormFileds/FormInputTextarea/FormInputTextarea'
import { useEffect } from 'react'
import withAuth from '@/utils/withAuth'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Alert, Snackbar } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { getData } from 'country-list'
import dayjs from 'dayjs'
import useUserRecords from '@/Store/GetUserRecords'
import AppContext from '@/components/Context/AppContext'
import { useContext } from 'react'
import Bio from '@/components/Profile/bio'
import Language from '@/components/Profile/languages'
import Education from '@/components/Profile/education'

const Profile = () => {
  const { GetUserRecords } = useContext(AppContext)
  const { token, user_id, setProfileID, profile_id, role } = useLoginData()

  const { users, profile } = useUserRecords()

  const [id, setId] = useState('')
  const [edu_id, setEduId] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const [deleteopen, setDeleteOpen] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [profileData, setProfileData] = useState('')

  //Profile
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUserName] = useState('')
  const [about, setAbout] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [goal, setGoal] = useState('')
  const [Interst, setInterst] = useState('')
  const [linkedin, setlinkedin] = useState('')
  const [websiteurl, setwebsiteurl] = useState('')

  // Language
  const [language, setlanguage] = useState('')
  const [fluent, setFluent] = useState('')

  // Education
  const [edu_degree, setEduDegree] = useState('')
  const [edu_major, setEduMajor] = useState('')
  const [edu_university, setEduUniversity] = useState('')
  const [edu_from_date, setEduFromDate] = useState('')
  const [edu_to_date, setEduToDate] = useState('')
  const [edu_city, setEduCity] = useState('')
  const [edu_country, setEduCountry] = useState('')

  // Experience
  const [exp_CompanyName, setExpCompanyName] = useState('')
  const [exp_Position, setExpPosition] = useState('')
  const [exp_from_date, setExpFromDate] = useState('')
  const [exp_to_date, setExpToDate] = useState('')
  const [exp_city, setExpCity] = useState('')
  const [exp_country, setExpCountry] = useState('')
  //Award
  const [award_title, setAwardTitle] = useState('')
  const [award_insti, setAwardInsti] = useState('')
  const [award_country, setAwardCountry] = useState('')
  const [award_period, setAwardPeriod] = useState('')

  //Extra CuricularAcrivities
  const [extra_title, setExtraTitle] = useState('')
  const [extra_institute, setExtraInstitute] = useState('')
  const [extra_contry, setExtraCountry] = useState('')
  const [extra_period, setExtraperiod] = useState('')

  // Research
  const [thesis_name, setThesisName] = useState('')
  const [publication, setPublication] = useState('')
  const [publi_year, setPublicationYear] = useState('')

  // Modal
  const [openlanguage, setOpenLanguage] = useState(false)
  const [openEducation, setOpenEducation] = useState(false)
  const [openExperience, setOpenExperience] = useState(false)
  const [openAward, setOpenAward] = useState(false)
  const [openExtraCur, setOpenExtraCur] = useState(false)
  const [openResearch, setOpenResearch] = useState(false)

  // Alert
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  // Edit
  const [upd, setUpd] = useState(false)
  const [del, setDel] = useState('')
  const [delname, setDelName] = useState('')

  useEffect(() => {
    GetProfile(users, profile)
  }, [users, profile])

  const GetProfile = async (users, profile) => {
    users.map((data) => {
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setUserName(data.user_name)
    })
    if (profile.length !== []) {
      profile?.map((data) => {
        if (data.status !== 400) {
          setProfileData(data)
          setProfileID(data.profile_id)
          setSelectedImage(data.profile_img)
          setAbout(data.about)
          setGoal(data.goal)
          setDob(dayjs(data.dob))
          setGender(data.gender)
          setInterst(data.intrest_area)
          setlinkedin(data.linkedin_url)
          setwebsiteurl(data.website_url)

          const countryValue = getData().find(
            (option) => option.name === data.country
          )
          setCountry(countryValue ? countryValue : null)
        }
      })
    } else {
      setProfileData([])
    }
  }

  // Clear Language Data
  const clearLangScr = () => {
    setlanguage('')
    setFluent('')
  }

  // Clear Education Data
  const clearEduScr = () => {
    setEduDegree('')
    setEduMajor('')
    setEduUniversity('')
    setEduFromDate('')
    setEduToDate('')
    setEduCity('')
    setEduCountry('')
  }

  const clearExpScr = () => {
    setExpCompanyName('')
    setExpPosition('')
    setExpFromDate('')
    setExpCity('')
    setExpToDate('')
    setExpCountry('')
  }

  const clearAwaScr = () => {
    setAwardTitle('')
    setAwardInsti('')
    setAwardCountry('')
    setAwardPeriod('')
  }
  const clearExtraScr = () => {
    setExtraTitle('')
    setExtraInstitute('')
    setExtraCountry('')
    setExtraperiod('')
  }

  const clearReaScr = () => {
    setThesisName('')
    setPublication('')
    setPublicationYear('')
  }

  const functionSubmit = async (e) => {
    e.preventDefault()

    if (user_id !== '') {
      const req = {
        first_name: firstname,
        last_name: lastname,
        token: token,
      }

      const url = `/api/AllUsers?user=${user_id}`
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(req),
      })
      await response.json()

      const headerreq = {
        token: token,
        profile_id: profile_id,
      }

      const reqest =
        role === 'client'
          ? {
              about: about,
              goal: goal,
              gender: gender,
              country: country.name,
              user: user_id,
              dob: dayjs(dob).format('YYYY-MM-DD'),
              token: token,
            }
          : {
              about: about,
              goal: goal,
              gender: gender,
              country: country.name,
              user: user_id,
              dob: dayjs(dob).format('YYYY-MM-DD'),
              token: token,
              intrest_area: Interst,
              linkedin_url: linkedin,
              website_url: websiteurl,
            }

      const headertoken = {
        token: token,
      }

      if (profileData.length === 0) {
        const url = `/api/Profile/profile`
        const response = await fetch(url, {
          method: 'POST',
          headers: headertoken,
          body: JSON.stringify(reqest),
        })

        if (response.ok) {
          const responseData = await response.json()
          setProfileID(responseData.profile_id)
          setAlertSeverity('success')
          setAlertMessage('Profile Added Successfully..')
          setAlertOpen(true)
          GetUserRecords(token, user_id)
        } else {
          setAlertSeverity('error')
          setAlertMessage(response.statusText)
          setAlertOpen(true)
        }
      } else {
        const url = `/api/Profile/profile`
        await fetch(url, {
          method: 'PATCH',
          headers: headerreq,
          body: JSON.stringify(reqest),
        })
      }
    }
  }

  const handleLanguageSubmit = async (e) => {
    e.preventDefault()
    const req = {
      language: language,
      language_level: fluent,
      profile: profile_id,
      user: user_id,
      token: token,
    }
    const url = `/api/Profile/language`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      clearLangScr()
      GetUserRecords(token, user_id)
      setAlertSeverity('success')
      setAlertMessage('Added Successfully')
      setAlertOpen(true)
      setOpenLanguage(false)
    } else {
      setAlertSeverity('error')
      setAlertMessage(data.message)
      setAlertOpen(true)
      setOpenLanguage(false)
      clearLangScr()
    }
  }

  const handleChange = (event, newValue) => {
    setFluent(newValue)
  }
  const handleGenderChange = (event, newValue) => {
    setGender(newValue)
  }
  const handleCountryChange = (event, newValue) => {
    setCountry(newValue)
  }
  const handleEduCountryChange = (event, newValue) => {
    setEduCountry(newValue)
  }
  const handleExpCountryChange = (event, newValue) => {
    setExpCountry(newValue)
  }
  const handleAwardCountryChange = (event, newValue) => {
    setAwardCountry(newValue)
  }
  const handleExtraCountryChange = (event, newValue) => {
    setExtraCountry(newValue)
  }

  const handleMajorChange = (event, newValue) => {
    setEduMajor(newValue)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
  }
  // Eduction Submit
  const handleEducationSubmit = async (e) => {
    e.preventDefault()

    const req = {
      degree: edu_degree,
      university: edu_university,
      major: edu_major,
      from_date: edu_from_date,
      to_date: edu_to_date,
      city: edu_city,
      country: edu_country.name,
      profile: profile_id,
      user: user_id,
      token: token,
    }

    const url = `/api/Profile/education`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearEduScr()
      setOpenEducation(false)
    } else {
      setAlertSeverity('error')
      setAlertMessage(data.message)
      setAlertOpen(true)
    }
  }

  //Experice Submit
  const handleExperienceSubmit = async (e) => {
    e.preventDefault()
    const req = {
      company_name: exp_CompanyName,
      position: exp_Position,
      working_from_date: exp_from_date,
      working_to_date: exp_to_date,
      city: exp_city,
      country: exp_country.name,
      profile: profile_id,
      user: user_id,
      token: token,
    }

    const url = `/api/Profile/experience`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearExpScr()
      setOpenExperience(false)
    } else {
      setAlertSeverity('error')
      setAlertMessage(data.message)
      setAlertOpen(true)
      setOpenExperience(false)
      clearExpScr()
    }
  }

  // Award Submit
  const handleAwardSubmit = async (e) => {
    e.preventDefault()
    const req = {
      award_title: award_title,
      award_institution: award_insti,
      award_period: award_period,
      country: award_country.name,
      profile: profile_id,
      user: user_id,
      token: token,
    }

    const url = `/api/Profile/award`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearAwaScr()
      setOpenAward(false)
    }
  }

  // Extra-Curicular Submit
  const handleExtraSubmit = async (e) => {
    e.preventDefault()
    const req = {
      ec_title: extra_title,
      ec_institution: extra_institute,
      ec_period: extra_period,
      country: extra_contry.name,
      profile: profile_id,
      user: user_id,
      token: token,
    }

    const url = `/api/Profile/extra`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearExtraScr()
      setOpenExtraCur(false)
    } else {
      setAlertSeverity('error')
      setAlertMessage(data.message)
      setAlertOpen(true)
      setOpenExtraCur(false)
    }
  }

  // Research Submit
  const handleResearchSubmit = async (e) => {
    e.preventDefault()
    const req = {
      thesis_name: thesis_name,
      publication: publication,
      // publication_year: publi_year,
      publication_year: dayjs(publi_year).format('YYYY-MM-DD'),

      profile: profile_id,
      user: user_id,
      token: token,
    }

    const url = `/api/Profile/research`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()

    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearReaScr()
      setOpenResearch(false)
    } else {
      setAlertSeverity('error')
      setAlertMessage(data.message)
      setAlertOpen(true)
    }
  }

  // Edit

  const handleLanguageEdit = async (id) => {
    console.log('id', id)
    setUpd(true)
    setId(id)
    const req = {
      token: token,
      user_id: user_id,
    }
    const response = await fetch(`api/Profile/language`, {
      method: 'GET',
      headers: req,
    })
    const data = await response.json()

    const filteredData = data.filter((obj) => obj.lang_id === id)
    filteredData.map((data) => {
      setlanguage(data.language)
      setFluent(data.language_level)
      setOpenLanguage(true)
    })
  }

  const handleEditLanguageSubmit = async (e) => {
    e.preventDefault()
    const req = {
      language: language,
      language_level: fluent,
      profile: profile_id,
      lang_id: id,
      user: user_id,
      token: token,
    }
    const url = `/api/Profile/language`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearLangScr()
      setUpd(false)
      setOpenLanguage(false)
    }
  }
  const handleEducationEdit = async (id) => {
    setUpd(true)
    setEduId(id)

    const req = {
      token: token,
      id: id,
    }
    const response = await fetch(`api/Profile/educationdata`, {
      method: 'GET',
      headers: req,
    })
    const data = await response.json()
    const filteredData = data.filter((obj) => obj.edu_id === id)
    filteredData.map((data) => {
      setEduDegree(data.degree)
      setEduUniversity(data.university)
      setEduMajor(data.major)
      setEduFromDate(dayjs(data.from_date))
      setEduToDate(dayjs(data.to_date))
      setEduCity(data.city)
      const countryValue = getData().find(
        (option) => option.name === data.country
      )
      setEduCountry(countryValue ? countryValue : null)
      setOpenEducation(true)
    })
  }

  const handleEditEducationSubmit = async (e) => {
    e.preventDefault()
    const req = {
      degree: edu_degree,
      university: edu_university,
      major: edu_major,
      from_date: edu_from_date,
      to_date: edu_to_date,
      city: edu_city,
      country: edu_country.name,
      edu_id: edu_id,
      profile: profile_id,
      user: user_id,
      token: token,
    }
    const url = `/api/Profile/education`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      GetUserRecords(token, user_id)
      clearEduScr()
      setUpd(false)
      setOpenEducation(false)
    }
  }
  const handleExperienceEdit = async (id) => {
    setUpd(true)
    setId(id)

    const req = {
      token: token,
      id: user_id,
    }
    const response = await fetch(`api/Profile/experience`, {
      method: 'GET',
      headers: req,
    })
    const data = await response.json()
    const filteredData = data.filter((obj) => obj.exp_id === id)
    filteredData.map((data) => {
      setExpCompanyName(data.company_name)
      setExpPosition(data.position)
      setExpFromDate(dayjs(data.working_from_date))
      setExpToDate(dayjs(data.working_to_date))
      setExpCity(data.city)
      const countryValue = getData().find(
        (option) => option.name === data.country
      )
      setExpCountry(countryValue ? countryValue : null)
      setOpenExperience(true)
    })
  }

  const handleEditExperienceSubmit = async (e) => {
    e.preventDefault()
    const req = {
      company_name: exp_CompanyName,
      position: exp_Position,
      working_from_date: exp_from_date,
      working_to_date: exp_to_date,
      city: exp_city,
      country: exp_country.name,
      exp_id: id,
      profile: profile_id,
      user: user_id,
      token: token,
    }
    const url = `/api/Profile/experience`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      clearExpScr()
      setUpd(false)
      setOpenExperience(false)
    }
  }
  const handleAwardEdit = async (id) => {
    setUpd(true)
    setId(id)

    const req = {
      token: token,
      id: user_id,
    }
    const response = await fetch(`api/Profile/awardById`, {
      method: 'GET',
      headers: req,
    })
    const data = await response.json()
    const filteredData = data.filter((obj) => obj.award_id === id)
    filteredData.map((data) => {
      setAwardTitle(data.award_title)
      setAwardInsti(data.award_institution)
      setAwardPeriod(data.award_from_date)
      const countryValue = getData().find(
        (option) => option.name === data.country
      )
      setAwardCountry(countryValue ? countryValue : null)

      setOpenAward(true)
    })
  }

  const handleEditAwardSubmit = async (e) => {
    e.preventDefault()
    const req = {
      award_title: award_title,
      award_institution: award_insti,
      award_from_date: award_period,
      country: award_country.name,
      award_id: id,
      user: user_id,
      profile: profile_id,
      token: token,
    }
    const url = `/api/Profile/award`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      setUpd(false)
      clearAwaScr()
      setOpenAward(false)
    }
  }
  const handleExtraEdit = async (id) => {
    setUpd(true)
    setId(id)
    const req = {
      token: token,
      id: id,
    }
    const response = await fetch(`api/Profile/extraByid`, {
      method: 'GET',
      headers: req,
    })
    const data = await response.json()
    const filteredData = data.filter((obj) => obj.ec_id === id)
    filteredData.map((data) => {
      setExtraTitle(data.ec_title)
      setExtraInstitute(data.ec_institution)
      setExtraperiod(data.ec_from_date)
      const countryValue = getData().find(
        (option) => option.name === data.country
      )
      setExtraCountry(countryValue ? countryValue : null)
      setOpenExtraCur(true)
    })
  }

  const handleEditExtraSubmit = async (e) => {
    e.preventDefault()
    const req = {
      ec_title: extra_title,
      ec_institution: extra_institute,
      ec_from_date: extra_period,
      country: extra_contry.name,
      ec_id: id,
      user: user_id,
      token: token,
      profile: profile_id,
    }
    const url = `/api/Profile/extra`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      setUpd(false)
      clearExtraScr()
      setOpenExtraCur(false)
    }
  }
  const handleResearchEdit = async (id) => {
    setUpd(true)
    setId(id)
    const req = {
      token: token,
      id: user_id,
    }
    const response = await fetch(`api/Profile/researchById`, {
      method: 'GET',
      headers: req,
    })
    const data = await response.json()
    const filteredData = data.filter((obj) => obj.rs_id === id)
    filteredData.map((data) => {
      setThesisName(data.thesis_name)
      setPublication(data.publication)
      setPublicationYear(data.publication_year)
      setOpenResearch(true)
    })
  }

  const handleEditResearchSubmit = async (e) => {
    e.preventDefault()

    const req = {
      thesis_name: thesis_name,
      publication: publication,
      // publication_year: publi_year,
      publication_year: dayjs(publi_year).format('YYYY-MM-DD'),
      profile: profile_id,
      rs_id: id,
      user: user_id,
      token: token,
    }
    const url = `/api/Profile/research`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    })
    const data = await response.json()
    if (data.error !== true) {
      setUpd(false)
      clearReaScr()
      setOpenResearch(false)
    }
  }

  // Delete

  const handleLanguageDelete = async (id) => {
    const req = {
      lang_id: id,
      token: token,
    }
    const url = `/api/Profile/language`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: req,
    })
    await response
    setDeleteOpen(false)
  }
  const handleEducationDelete = async (id) => {
    const req = {
      edu_: id,
      token: token,
    }
    const url = `/api/Profile/education`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: req,
    })
    await response
    setDeleteOpen(false)
  }
  const handleExperienceDelete = async (id) => {
    const req = {
      exp_id: id,
      token: token,
    }
    const url = `/api/Profile/experience`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: req,
    })
    await response
    setDeleteOpen(false)
  }
  const handleAwardDelete = async (id) => {
    const req = {
      award_id: id,
      token: token,
    }

    const url = `/api/Profile/award`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: req,
    })
    await response
    setDeleteOpen(false)
  }
  const handleExtraDelete = async (id) => {
    const req = {
      ec_id: id,
      token: token,
    }
    const url = `/api/Profile/extra`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: req,
    })
    await response
    setDeleteOpen(false)
  }
  const handleResearchDelete = async (id) => {
    const req = {
      rs_id: id,
      token: token,
    }
    const url = `/api/Profile/`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: req,
    })
    await response
    setDeleteOpen(false)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    const formData = new FormData()
    formData.append('profile_img', file)

    try {
      const url = `http://18.141.138.1:8000/api/v1/user/profile/${profile_id}`
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          ApiKey: 'Jubai',
          Referer: 'Jubai',
        },
        body: formData,
      })

      if (response.ok) {
        setAlertSeverity('success')
        setAlertMessage('Profile Updated Successfully')
        setAlertOpen(true)
      }
    } catch (error) {
      console.log('Err', error)
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleIconClick = () => {
    document.getElementById('image-upload').click()
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div>
      <Header />
      <Container>
        <div className={Styles.profile}>
          <Sheet variant="outlined" color="neutral" sx={{ p: 4 }}>
            <div className={Styles.profileimage}>
              <div>
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="userprofile"
                    width={150}
                    height={150}
                    className={Styles.userprofileimg}
                  />
                ) : (
                  <Image
                    src="/images/user.png"
                    alt="userprofile"
                    width={150}
                    height={150}
                    className={Styles.userprofileimg}
                  />
                )}

                <div className={Styles.uploadimgoverlay}>
                  <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <IconButton
                    color="red"
                    type="file"
                    onChange={handleFileUpload}
                    onClick={handleIconClick}
                    className={Styles.uploadimg}
                  >
                    <CameraAltIcon />
                  </IconButton>
                </div>
              </div>
              <div>
                <h1>
                  {firstname} {lastname}
                </h1>
                <h4>{username}</h4>
                <p>Professor</p>
              </div>
            </div>
            <Bio />
            <h3 className={Styles.profileheading}>Language</h3>
            <Language />
            <h3 className={Styles.profileheading}>Eduacation</h3>
            <Education />



            
          </Sheet>
        </div>
        </Container>
  

           

            {/* <Sheet
              variant="outlined"
              color="neutral"
              sx={{ p: 2, borderRadius: '10px' }}
            >
              <h3>What languages do you speak ?</h3>

              {profile[0]?.language?.map((res, index) => (
                <div className={Styles.paralist} key={index}>
                  <p>
                    {res.language} {res.language_level}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleLanguageEdit(res.lang_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.lang_id)
                        setDelName(res.language)
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className={Styles.dflexend}>
                <JButton
                  starticon={<AddOutlinedIcon />}
                  colored={true}
                  variant="outlined"
                  text="Add Language"
                  click={() => setOpenLanguage(true)}
                />
              </div>
            </Sheet> */} 
            {/* <Sheet
              variant="outlined"
              color="neutral"
              sx={{ p: 2, borderRadius: '10px' }}
            >
              <Grid container spacing={2} className={Styles.profileinput}>
                <Grid item lg={6}>
                  <label>First Name</label>
                  <FormInputText
                    type="text"
                    placetext="First Name"
                    classes={CommonStyles.spaceten}
                    value={firstname}
                    change={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <label>Last Name</label>
                  <FormInputText
                    type="text"
                    placetext="Last Name"
                    value={lastname}
                    classes={CommonStyles.spaceten}
                    change={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <label>About</label>
                  <FormInputTextarea
                    row="4"
                    placetext="About"
                    value={about}
                    classes={CommonStyles.spaceten}
                    change={(e) => setAbout(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <label>Goal</label>

                  <FormInputTextarea
                    row="4"
                    placetext="Goal"
                    value={goal}
                    classes={CommonStyles.spaceten}
                    change={(e) => setGoal(e.target.value)}
                  />
                </Grid>

                <Grid item lg={6}>
                  <label>Date of Birth</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      value={dob ? dayjs(dob) : null}
                      // value={dob}
                      onChange={(date) =>
                        setDob(dayjs(date).format('YYYY-MM-DD'))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params.inputProps}
                          value={params.inputProps.value || ''}
                          label="Select Date"
                          variant="outlined"
                        />
                      )}
                      className={CommonStyles.datepicker}
                      inputFormat="yyyy-MM-dd"
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item lg={6}>
                  <label>Gender</label>
                  <Select
                    placeholder="Gender"
                    value={gender}
                    className={CommonStyles.spaceten}
                    onChange={handleGenderChange}
                    size="lg"
                    required
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Grid>
                <Grid item lg={6}>
                  <label>Country</label>

                  <Autocomplete
                    options={getData()}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: 540, height: 50 }}
                    value={country || null}
                    onChange={handleCountryChange}
                  />
                </Grid>
                {role === 'consultant' ? (
                  <>
                    <Grid item lg={6}>
                      <label>Intersted Area</label>
                      <FormInputText
                        type="text"
                        placetext="Intersted Area"
                        classes={CommonStyles.spaceten}
                        value={Interst}
                        change={(e) => setInterst(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>LinkedIn</label>
                      <FormInputText
                        type="url"
                        placetext="LinkedIn"
                        classes={CommonStyles.spaceten}
                        value={linkedin}
                        change={(e) => setlinkedin(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Website url</label>
                      <FormInputText
                        type="url"
                        placetext="Website url"
                        classes={CommonStyles.spaceten}
                        value={websiteurl}
                        change={(e) => setwebsiteurl(e.target.value)}
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Sheet> */}

            {/* <h3 className={Styles.profileheading}>Education</h3>
            <Sheet
              variant="outlined"
              color="neutral"
              sx={{ p: 2, borderRadius: '10px' }}
            >
              <div className={Styles.dflexend}>
                <JButton
                  starticon={<AddOutlinedIcon />}
                  colored={true}
                  variant="outlined"
                  text="Add Language"
                  click={() => setOpenLanguage(true)}
                />
              </div>
            </Sheet> */}

            {/* <h3 className={Styles.profileheading}>
              Add the schools you attend, areas of study,and the degrees earned
            </h3> */}
           

        {/* <div className={Styles.profile}>
          <div className={Styles.profileimage}>
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="userprofile"
                width={150}
                height={150}
                className={Styles.userprofileimg}
              />
            ) : (
              <Image
                src="/images/user.png"
                alt="userprofile"
                width={150}
                height={150}
                className={Styles.userprofileimg}
              />
            )}

            <div className={Styles.uploadimgoverlay}>
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <IconButton
                color="red"
                type="file"
                onChange={handleFileUpload}
                onClick={handleIconClick}
                className={Styles.uploadimg}
              >
                <CameraAltIcon />
              </IconButton>
            </div>
          </div>
          <div></div>
        </div> */}
        {/* <Tabs
          size="sm"
          aria-label="Pricing plan"
          defaultValue={0}
          sx={(theme) => ({
            marginTop: '30px',
            '--Tabs-gap': '0px',
            borderRadius: 'lg',
            boxShadow: 'sm',
            overflow: 'auto',
            border: `1px solid ${theme.vars.palette.divider}`,
          })}
          value={activeTab}
          onChange={handleTabChange}
        > */}
        {/* <TabList
            className={Styles.tabprof}
            sx={{
              '--ListItem-radius': '0px',
              borderRadius: 0,
              borderBottom: '2px solid #dddddd',
              [`& .${tabClasses.root}`]: {
                fontWeight: 'lg',
                flex: 1,
                bgcolor: 'background.body',
                position: 'relative',
                [`&.${tabClasses.selected}`]: {
                  color: 'primary.500',
                },
                [`&.${tabClasses.selected}:before`]: {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: -1,
                  width: '100%',
                  height: 2,
                  bgcolor: 'primary.400',
                },
                [`&.${tabClasses.focusVisible}`]: {
                  outlineOffset: '-3px',
                },
              },
            }}
          >
            <Tab style={{ padding: '18px 0' }}>Profile </Tab>
            <Tab style={{ padding: '18px 0' }}>Language</Tab>
            <Tab style={{ padding: '18px 0' }}>Education</Tab>
            <Tab style={{ padding: '18px 0' }}>Experience</Tab>
            {role === 'consultant' ? (
              <>
                <Tab style={{ padding: '18px 0' }}>Award & Achievement</Tab>
                <Tab style={{ padding: '18px 0' }}>Extra Curricular</Tab>
                <Tab style={{ padding: '18px 0' }}>Research</Tab>
              </>
            ) : null}
          </TabList> */}
        {/* <TabPanel value={0} sx={{ p: 3 }}>
            <form onSubmit={functionSubmit} className={CommonStyles.formfields}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <label>First Name</label>
                  <FormInputText
                    type="text"
                    placetext="First Name"
                    classes={CommonStyles.spaceten}
                    value={firstname}
                    change={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <label>Last Name</label>
                  <FormInputText
                    type="text"
                    placetext="Last Name"
                    value={lastname}
                    classes={CommonStyles.spaceten}
                    change={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <label>About</label>
                  <FormInputTextarea
                    row="4"
                    placetext="About"
                    value={about}
                    classes={CommonStyles.spaceten}
                    change={(e) => setAbout(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <label>Goal</label>

                  <FormInputTextarea
                    row="4"
                    placetext="Goal"
                    value={goal}
                    classes={CommonStyles.spaceten}
                    change={(e) => setGoal(e.target.value)}
                  />
                </Grid>

                <Grid item lg={6}>
                  <label>Date of Birth</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      value={dob ? dayjs(dob) : null}
                      // value={dob}
                      onChange={(date) =>
                        setDob(dayjs(date).format('YYYY-MM-DD'))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params.inputProps}
                          value={params.inputProps.value || ''}
                          label="Select Date"
                          variant="outlined"
                        />
                      )}
                      className={CommonStyles.datepicker}
                      inputFormat="yyyy-MM-dd"
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item lg={6}>
                  <label>Gender</label>
                  <Select
                    placeholder="Gender"
                    value={gender}
                    className={CommonStyles.spaceten}
                    onChange={handleGenderChange}
                    size="lg"
                    required
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Grid>
                <Grid item lg={6}>
                  <label>Country</label>

                  <Autocomplete
                    options={getData()}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: 540, height: 50 }}
                    value={country || null}
                    onChange={handleCountryChange}
                  />
                </Grid>
                {role === 'consultant' ? (
                  <>
                    <Grid item lg={6}>
                      <label>Intersted Area</label>
                      <FormInputText
                        type="text"
                        placetext="Intersted Area"
                        classes={CommonStyles.spaceten}
                        value={Interst}
                        change={(e) => setInterst(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>LinkedIn</label>
                      <FormInputText
                        type="url"
                        placetext="LinkedIn"
                        classes={CommonStyles.spaceten}
                        value={linkedin}
                        change={(e) => setlinkedin(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Website url</label>
                      <FormInputText
                        type="url"
                        placetext="Website url"
                        classes={CommonStyles.spaceten}
                        value={websiteurl}
                        change={(e) => setwebsiteurl(e.target.value)}
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <div className={CommonStyles.dflexend}>
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Submit"
                  click={functionSubmit}
                />
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Next"
                  click={() => setActiveTab(activeTab + 1)}
                />
              </div>
            </form>
          </TabPanel> */}
        {/* <TabPanel value={1} sx={{ p: 3 }}>
            <form className={CommonStyles.formfields}>
              <h3 className={Styles.profileheading}>
                What languages do you speak ?
              </h3>

              {profile[0]?.language?.map((res, index) => (
                <div className={Styles.paralist} key={index}>
                  <p>
                    {res.language} {res.language_level}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleLanguageEdit(res.lang_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.lang_id)
                        setDelName(res.language)
                      }}
                    />
                  </div>
                </div>
              ))}

              <JButton
                starticon={<AddOutlinedIcon />}
                classes={` ${CommonStyles.spacetop}`}
                variant="outlined"
                text="Add Language"
                click={() => setOpenLanguage(true)}
              />
              <div className={CommonStyles.dflexend}>
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Next"
                  click={() => setActiveTab(activeTab + 1)}
                />
              </div>

              <Modal
                open={deleteopen}
                onClose={() => {
                  setDeleteOpen(false)
                  clearLangScr()
                }}
              >
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography
                    id="alert-dialog-modal-description"
                    textColor="text.tertiary"
                  >
                    Are you sure you want to Delete {delname}?
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end',
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleLanguageDelete(del)}
                    >
                      Submit
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>

              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openlanguage}
                onClose={() => {
                  setOpenLanguage(false)
                  clearLangScr()
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{
                    width: 1000,
                    maxWidth: 6500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                  }}
                >
                  <ModalClose
                    variant="outlined"
                    sx={{
                      top: 'calc(-1/4 * var(--IconButton-size))',
                      right: 'calc(-1/4 * var(--IconButton-size))',
                      boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                      borderRadius: '50%',
                      bgcolor: 'background.body',
                    }}
                  />

                  <div style={{ marginBottom: '20px' }}>
                    <h1>Add Language</h1>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <label>Language</label>
                      <FormInputText
                        type="text"
                        placetext="Language"
                        classes={CommonStyles.spaceten}
                        value={language}
                        change={(e) => {
                          setlanguage(e.target.value)
                        }}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Level</label>

                      <Select
                        placeholder="Level"
                        value={fluent}
                        onChange={handleChange}
                        className={CommonStyles.spaceten}
                        size="lg"
                      >
                        <Option value="Mother Tongue">Mother Tongue</Option>
                        <Option value="Intermediate">Intermediate</Option>
                        <Option value="Fluent">Fluent</Option>
                      </Select>
                    </Grid>
                  </Grid>
                  <div className={CommonStyles.dflexend}>
                    {upd === true ? (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEditLanguageSubmit}
                      />
                    ) : (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleLanguageSubmit}
                      />
                    )}
                  </div>
                </Sheet>
              </Modal>
            </form>
          </TabPanel> */}
        {/* <TabPanel value={2} sx={{ p: 3 }}>
            <form className={CommonStyles.formfields}>
              <h3 className={Styles.profileheading}>
                Add the schools you attend, areas of study,and the degrees
                earned
              </h3>

              {profile[0]?.education?.map((res, index) => (
                <div className={Styles.paralist} key={index}>
                  <p>
                    {res.degree},{res.major},{res.university}, {res.country}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleEducationEdit(res.edu_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.edu_id)
                        setDelName(res.degree)
                      }}
                    />
                  </div>
                </div>
              ))}

              <JButton
                starticon={<AddOutlinedIcon />}
                classes={` ${CommonStyles.spacetop}`}
                variant="outlined"
                text="Add Education"
                click={() => setOpenEducation(true)}
              />
              <div className={CommonStyles.dflexend}>
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Next"
                  click={() => setActiveTab(activeTab + 1)}
                />
              </div>

              <Modal open={deleteopen} onClose={() => setDeleteOpen(false)}>
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography
                    id="alert-dialog-modal-description"
                    textColor="text.tertiary"
                  >
                    Are you sure you want to Delete {delname}?
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end',
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleEducationDelete(del)}
                    >
                      Submit
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>

              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openEducation}
                onClose={() => {
                  setOpenEducation(false)
                  clearEduScr()
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{
                    width: 1000,
                    maxWidth: 6500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                  }}
                >
                  <ModalClose
                    variant="outlined"
                    sx={{
                      top: 'calc(-1/4 * var(--IconButton-size))',
                      right: 'calc(-1/4 * var(--IconButton-size))',
                      boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                      borderRadius: '50%',
                      bgcolor: 'background.body',
                    }}
                  />
                  <div style={{ marginBottom: '20px' }}>
                    <h1>Add Education</h1>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <label>Degree</label>
                      <FormInputText
                        type="text"
                        placetext="Degree"
                        classes={CommonStyles.spaceten}
                        value={edu_degree}
                        change={(e) => setEduDegree(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Major</label>
                      <Select
                        placetext="Major"
                        value={edu_major}
                        onChange={handleMajorChange}
                        className={CommonStyles.spaceten}
                        size="lg"
                      >
                        <Option value="Dr">Docrate(Dr.)</Option>
                        <Option value="Master">Master</Option>
                        <Option value="Bachelor">Bachelor</Option>
                        <Option value="Diploma">Diploma</Option>
                        <Option value="High School">High School</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Grid>
                    <Grid item lg={12}>
                      <label>Institution/University</label>
                      <FormInputText
                        type="text"
                        placetext="University"
                        classes={CommonStyles.spaceten}
                        value={edu_university}
                        change={(e) => setEduUniversity(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={6}>
                      <label>From Date</label>
                      <br></br>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          value={edu_from_date ? dayjs(edu_from_date) : null}
                          onChange={(date) =>
                            setEduFromDate(dayjs(date).format('YYYY-MM-DD'))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params.inputProps}
                              value={params.inputProps.value || ''}
                              label="Select Date"
                              variant="outlined"
                            />
                          )}
                          className={CommonStyles.datepicker}
                          inputFormat="yyyy-MM-dd"
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={6}>
                      <label>To Date</label>
                      <br></br>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          value={edu_to_date ? dayjs(edu_to_date) : null}
                          onChange={(date) =>
                            setEduToDate(dayjs(date).format('YYYY-MM-DD'))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params.inputProps}
                              value={params.inputProps.value || ''}
                              label="Select Date"
                              variant="outlined"
                            />
                          )}
                          className={CommonStyles.datepicker}
                          inputFormat="yyyy-MM-dd"
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item lg={6}>
                      <label>Country</label>
                      <Autocomplete
                        options={getData()}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        value={edu_country || null}
                        onChange={handleEduCountryChange}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>City</label>
                      <FormInputText
                        type="text"
                        placetext="City"
                        classes={CommonStyles.spaceten}
                        value={edu_city}
                        change={(e) => setEduCity(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <div className={CommonStyles.dflexend}>
                    {upd === true ? (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEditEducationSubmit}
                      />
                    ) : (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEducationSubmit}
                      />
                    )}
                  </div>
                </Sheet>
              </Modal>
            </form>
          </TabPanel> */}
        {/* <TabPanel value={3} sx={{ p: 3 }}>
            <form className={CommonStyles.formfields}>
              <h3 className={Styles.profileheading}>
                Add the Experience Details.
              </h3>

              {profile[0]?.experience?.map((res, index) => (
                <div className={Styles.paralist} key={index}>
                  <p>
                    {res.company_name}, {res.position},{res.city}, {res.country}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleExperienceEdit(res.exp_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.exp_id)
                        setDelName(res.company_name)
                      }}
                    />
                  </div>
                </div>
              ))}

              <JButton
                starticon={<AddOutlinedIcon />}
                classes={` ${CommonStyles.spacetop}`}
                variant="outlined"
                text="Add Experience"
                click={() => setOpenExperience(true)}
              />
              <div className={CommonStyles.dflexend}>
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Next"
                  click={() => setActiveTab(activeTab + 1)}
                />
              </div>

              <Modal open={deleteopen} onClose={() => setDeleteOpen(false)}>
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography
                    id="alert-dialog-modal-description"
                    textColor="text.tertiary"
                  >
                    Are you sure you want to Delete {delname} ?
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end',
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleExperienceDelete(del)}
                    >
                      Submit
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>

              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openExperience}
                onClose={() => {
                  setOpenExperience(false)
                  clearExpScr()
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{
                    width: 1000,
                    maxWidth: 6500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                  }}
                >
                  <ModalClose
                    variant="outlined"
                    sx={{
                      top: 'calc(-1/4 * var(--IconButton-size))',
                      right: 'calc(-1/4 * var(--IconButton-size))',
                      boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                      borderRadius: '50%',
                      bgcolor: 'background.body',
                    }}
                  />
                  <div style={{ marginBottom: '20px' }}>
                    <h1>Add Experience</h1>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <label>Company Name</label>
                      <FormInputText
                        type="text"
                        placetext="Company Name"
                        classes={CommonStyles.spaceten}
                        value={exp_CompanyName}
                        change={(e) => setExpCompanyName(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Position</label>
                      <FormInputText
                        type="text"
                        placetext="Position"
                        value={exp_Position}
                        classes={CommonStyles.spaceten}
                        change={(e) => setExpPosition(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={6}>
                      <label>From Date</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          value={exp_from_date ? dayjs(exp_from_date) : null}
                          onChange={(date) =>
                            setExpFromDate(dayjs(date).format('YYYY-MM-DD'))
                          }
                          renderInput={(params) => (
                            <input
                              {...params.inputProps}
                              value={params.inputProps.value || ''}
                              label="Select Date"
                            />
                          )}
                          className={CommonStyles.datepicker}
                          inputFormat="yyyy-MM-dd"
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={6}>
                      <label>To Date</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          value={exp_to_date}
                          onChange={(date) =>
                            setExpToDate(dayjs(date).format('YYYY-MM-DD'))
                          }
                          renderInput={(params) => (
                            <input
                              {...params.inputProps}
                              value={params.inputProps.value || ''}
                              label="Select Date"
                            />
                          )}
                          className={CommonStyles.datepicker}
                          inputFormat="yyyy-MM-dd"
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item lg={6}>
                      <label>Country</label>

                      <Autocomplete
                        options={getData()}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        value={exp_country || null}
                        onChange={handleExpCountryChange}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>City</label>
                      <FormInputText
                        type="text"
                        placetext="City"
                        value={exp_city}
                        classes={CommonStyles.spaceten}
                        change={(e) => setExpCity(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <div className={CommonStyles.dflexend}>
                    {upd === true ? (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEditExperienceSubmit}
                      />
                    ) : (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleExperienceSubmit}
                      />
                    )}
                  </div>
                </Sheet>
              </Modal>
            </form>
          </TabPanel> */}
        {/* <TabPanel value={4} sx={{ p: 3 }}>
            <form className={CommonStyles.formfields}>
              <h3 className={Styles.profileheading}>
                Add the Awards and achivement Details.
              </h3>

              {profile[0]?.awards?.map((res, index) => (
                <div className={Styles.paralist} key={index}>
                  <p>
                    {res.award_title}, {res.award_institution},
                    {res.award_period}, {res.country}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleAwardEdit(res.award_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.award_id)
                        setDelName(res.award_title)
                      }}
                    />
                  </div>
                </div>
              ))}

              <JButton
                starticon={<AddOutlinedIcon />}
                classes={` ${CommonStyles.spacetop}`}
                variant="outlined"
                text="Add Awards"
                click={() => setOpenAward(true)}
              />
              <div className={CommonStyles.dflexend}>
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Next"
                  click={() => setActiveTab(activeTab + 1)}
                />
              </div>

              <Modal open={deleteopen} onClose={() => setDeleteOpen(false)}>
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography
                    id="alert-dialog-modal-description"
                    textColor="text.tertiary"
                  >
                    Are you sure you want to Delete {delname}?
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end',
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleAwardDelete(del)}
                    >
                      Submit
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>

              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openAward}
                onClose={() => {
                  setOpenAward(false)
                  clearAwaScr()
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{
                    width: 1000,
                    maxWidth: 6500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                  }}
                >
                  <ModalClose
                    variant="outlined"
                    sx={{
                      top: 'calc(-1/4 * var(--IconButton-size))',
                      right: 'calc(-1/4 * var(--IconButton-size))',
                      boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                      borderRadius: '50%',
                      bgcolor: 'background.body',
                    }}
                  />
                  <div style={{ marginBottom: '20px' }}>
                    <h1>Add Award</h1>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <label>Award Title</label>
                      <FormInputText
                        type="text"
                        placetext="Award Title"
                        classes={CommonStyles.spaceten}
                        value={award_title}
                        change={(e) => setAwardTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Award Institution</label>
                      <FormInputText
                        type="text"
                        placetext="Award Institution"
                        value={award_insti}
                        classes={CommonStyles.spaceten}
                        change={(e) => setAwardInsti(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={6}>
                      <label>Country</label>
                      <Autocomplete
                        options={getData()}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        value={award_country || null}
                        onChange={handleAwardCountryChange}
                      />
                    </Grid>
                  </Grid>
                  <div className={CommonStyles.dflexend}>
                    {upd === true ? (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEditAwardSubmit}
                      />
                    ) : (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleAwardSubmit}
                      />
                    )}
                  </div>
                </Sheet>
              </Modal>
            </form>
          </TabPanel> */}
        {/* <TabPanel value={5} sx={{ p: 3 }}>
            <form className={CommonStyles.formfields}>
              <h3 className={Styles.profileheading}>
                Add the Extra Curricular Details.
              </h3>
              {profile[0]?.extra_curricular?.map((res, index) => (
                <div key={index} className={Styles.paralist}>
                  <p>
                    {res.ec_title}, {res.ec_institution},{res.ec_institution},{' '}
                    {res.country}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleExtraEdit(res.ec_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.ec_id)
                        setDelName(res.ec_title)
                      }}
                    />
                  </div>
                </div>
              ))}

              <Modal open={deleteopen} onClose={() => setDeleteOpen(false)}>
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography
                    id="alert-dialog-modal-description"
                    textColor="text.tertiary"
                  >
                    Are you sure you want to Delete {delname}?
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end',
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleExtraDelete(del)}
                    >
                      Submit
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>
              <JButton
                starticon={<AddOutlinedIcon />}
                classes={` ${CommonStyles.spacetop}`}
                variant="outlined"
                text="Add Extra Curricular"
                click={() => setOpenExtraCur(true)}
              />
              <div className={CommonStyles.dflexend}>
                <JButton
                  classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                  variant="outlined"
                  text="Next"
                  click={() => setActiveTab(activeTab + 1)}
                />
              </div>

              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openExtraCur}
                onClose={() => {
                  setOpenExtraCur(false)
                  clearExtraScr()
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{
                    width: 1000,
                    maxWidth: 6500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                  }}
                >
                  <ModalClose
                    variant="outlined"
                    sx={{
                      top: 'calc(-1/4 * var(--IconButton-size))',
                      right: 'calc(-1/4 * var(--IconButton-size))',
                      boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                      borderRadius: '50%',
                      bgcolor: 'background.body',
                    }}
                  />
                  <div style={{ marginBottom: '20px' }}>
                    <h1>Add Extra Curricular activities</h1>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <label>Extracurricular Title</label>
                      <FormInputText
                        type="text"
                        placetext="Title"
                        classes={CommonStyles.spaceten}
                        value={extra_title}
                        change={(e) => setExtraTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Extracurricular Institution</label>
                      <FormInputText
                        type="text"
                        placetext="Institution"
                        value={extra_institute}
                        classes={CommonStyles.spaceten}
                        change={(e) => setExtraInstitute(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={6}>
                      <label>Extracurricular Period</label>
                      <FormInputText
                        type="text"
                        placetext="From Date"
                        value={extra_period}
                        classes={CommonStyles.spaceten}
                        change={(e) => setExtraperiod(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={6}>
                      <label>Country</label>
                      <Autocomplete
                        options={getData()}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        value={extra_contry || null}
                        onChange={handleExtraCountryChange}
                      />
                    </Grid>
                  </Grid>
                  <div className={CommonStyles.dflexend}>
                    {upd === true ? (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEditExtraSubmit}
                      />
                    ) : (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleExtraSubmit}
                      />
                    )}
                  </div>
                </Sheet>
              </Modal>
            </form>
          </TabPanel> */}
        {/* <TabPanel value={6} sx={{ p: 3 }}>
            <form className={CommonStyles.formfields}>
              <h3 className={Styles.profileheading}>
                Add the Research Details.
              </h3>
              {profile[0]?.research_works?.map((res, index) => (
                <div className={Styles.paralist} key={index}>
                  <p>
                    {res.thesis_name}, {res.publication},{res.publication_year}
                  </p>
                  <div className={Styles.editicon}>
                    <EditOutlinedIcon
                      onClick={() => {
                        handleResearchEdit(res.rs_id)
                      }}
                    />
                  </div>
                  <div className={Styles.delicon}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setDeleteOpen(true)
                        setDel(res.rs_id)
                        setDelName(res.thesis_name)
                      }}
                    />
                  </div>
                </div>
              ))}
              <Modal open={deleteopen} onClose={() => setDeleteOpen(false)}>
                <ModalDialog
                  variant="outlined"
                  role="alertdialog"
                  aria-labelledby="alert-dialog-modal-title"
                  aria-describedby="alert-dialog-modal-description"
                >
                  <Typography
                    id="alert-dialog-modal-title"
                    component="h2"
                    startDecorator={<WarningRoundedIcon />}
                  >
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography
                    id="alert-dialog-modal-description"
                    textColor="text.tertiary"
                  >
                    Are you sure you want to Delete {delname}?
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end',
                      pt: 2,
                    }}
                  >
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleResearchDelete(del)}
                    >
                      Submit
                    </Button>
                  </Box>
                </ModalDialog>
              </Modal>
              <JButton
                starticon={<AddOutlinedIcon />}
                classes={` ${CommonStyles.spacetop}`}
                variant="outlined"
                text="Add Research"
                click={() => setOpenResearch(true)}
              />

              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openResearch}
                onClose={() => {
                  setOpenResearch(false)
                  clearReaScr()
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{
                    width: 1000,
                    maxWidth: 6500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                  }}
                >
                  <ModalClose
                    variant="outlined"
                    sx={{
                      top: 'calc(-1/4 * var(--IconButton-size))',
                      right: 'calc(-1/4 * var(--IconButton-size))',
                      boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                      borderRadius: '50%',
                      bgcolor: 'background.body',
                    }}
                  />
                  <div style={{ marginBottom: '20px' }}>
                    <h1>Add Research Details</h1>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <label>Thesis Name</label>
                      <FormInputTextarea
                        row="4"
                        placetext="Thesis Name"
                        classes={CommonStyles.spaceten}
                        value={thesis_name}
                        change={(e) => setThesisName(e.target.value)}
                      />
                    </Grid>

                    <Grid item lg={6}>
                      <label>Publication</label>
                      <FormInputText
                        type="text"
                        placetext="Publication"
                        value={publication}
                        classes={CommonStyles.spaceten}
                        change={(e) => setPublication(e.target.value)}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <label>Publication Year</label>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          value={publi_year ? dayjs(publi_year) : null}
                          onChange={(date) =>
                            setPublicationYear(dayjs(date).format('YYYY-MM-DD'))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params.inputProps}
                              value={params.inputProps.value || ''}
                              label="Select Date"
                              variant="outlined"
                            />
                          )}
                          className={CommonStyles.datepicker}
                          inputFormat="yyyy-MM-dd"
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <div className={CommonStyles.dflexend}>
                    {upd === true ? (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleEditResearchSubmit}
                      />
                    ) : (
                      <JButton
                        classes={`${CommonStyles.coloredbtn} ${CommonStyles.spacetop}`}
                        variant="outlined"
                        text="Submit"
                        click={handleResearchSubmit}
                      />
                    )}
                  </div>
                </Sheet>
              </Modal>
            </form>
          </TabPanel> */}
        {/* </Tabs> */}
        {/* 
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertSeverity}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar> */}
       </div>
  )
}

export default withAuth(Profile)
