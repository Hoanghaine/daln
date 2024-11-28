import { Box, Button, Typography, Stack } from '@mui/material'
import React, { useState } from 'react'
import logo from '../../../../assets/logo.png'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import SuggestDoctors from '../../../../components/mainPage/SuggestDoctors'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import parse from 'html-react-parser'
import { IQuiz } from '../../../../types/quiz'
import {
  useGetQuizzesQuery,
  useSubmitQuizzesMutation,
} from '../../../../redux/api/api.caller'
import QuizResult from './QuizResult'
import LazyLoading from '../../../../components/LazyLoading'
import LazyLoadingQuiz from '../../../../components/LazyLoading/LazyLoadingQuiz'

const Introduction = ({ onNext }: { onNext: () => void }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '16px',

        '& ul': {
          paddingLeft: '16px',
          '& li::marker': {
            color: '#3C5EAB',
          },
        },
      }}
    >
      <Typography variant='h4' mb={2} color={'#3C5EAB'}>
        Bài đánh giá trầm cảm
      </Typography>
      <ul>
        <li
          style={{
            fontSize: '1.2rem',
            marginBottom: '4px',
            textAlign: 'center',
            width: 'fit-content',
            padding: '8px',
          }}
        >
          Bộ công cụ đánh giá trầm cảm (Beck) dành cho lứa tuổi trên 16 tuổi
        </li>
        <li
          style={{
            fontSize: '1.2rem',
            marginBottom: '4px',
            textAlign: 'center',
            width: 'fit-content',
            padding: '8px',
          }}
        >
          Chúng tôi cam kết các thông tin của quý anh chị và trẻ được bảo mật
        </li>
        <li
          style={{
            fontSize: '1.2rem',
            marginBottom: '4px',
            textAlign: 'center',
            width: 'fit-content',
            padding: '8px',
          }}
        >
          Chúng tôi cam kết các thông tin của quý anh chị và trẻ được bảo mật
        </li>
      </ul>
      <Button variant='outlined' onClick={onNext}>
        Tiếp theo
      </Button>
    </Box>
  )
}

const Question = ({
  id,
  question,
  choice,
  onAnswer,
}: {
  id: number
  question: string
  choice: string[]
  onAnswer: (id: number, choiced: string) => void
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
      }}
    >
      <Typography variant='h4' mb={2}>
        {question}
      </Typography>
      <Stack
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {choice.map((choice, index) => (
          <Button
            variant='outlined'
            sx={{
              borderRadius: '16px',
              margin: '8px',
              border: '2px solid #65AD45',
              backgroundColor: 'rgba(101, 173, 69, 0.2)', // 100% opacity

              color: '#000',
              fontSize: '1.2rem',
              textAlign: 'left',
              '&:hover': {
                backgroundColor: 'rgba(101, 173, 69, 1)', // 100% opacity
              },
            }}
            key={index}
            onClick={() => onAnswer(id, choice)}
          >
            {choice}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}
const depressionLevels = [
  { label: 'Điểm của bạn', color: '#fff', border: '#000', hasBorder: true },
  { label: 'Vùng an toàn', color: '#65AD45' },
  { label: 'Vùng trầm cảm nhẹ', color: '#A1C63A' },
  { label: 'Vùng trầm cảm vừa', color: '#F7DD2E' },
  { label: 'Vùng trầm cảm nặng', color: '#BA1C1D' },
]

export default function DepressionTest() {
  const [step, setStep] = React.useState(0)
  interface TestResult {
    score: number | null
    result: string | null
    explanation: string | null
    suggestions: string | null
  }

  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [answers, setAnswers] = React.useState<
    { quizId: number; answer: string }[]
  >([])

  const { data: response, isLoading } = useGetQuizzesQuery()
  const [submitQuizzes] = useSubmitQuizzesMutation()

  const listQuiz: IQuiz[] = response?.data || []

  const handleAnswer = (id: number, choiced: string) => {
    setAnswers(prevAnswers => [...prevAnswers, { quizId: id, answer: choiced }])

    handleNextStep()
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers([])
  }

  const getCirlePosition = (score: number) => {
    // Chia thang điểm từ 0 đến 10 thành các phần
    console.log('score', score)
    return `${(score / 60) * 100}%`
  }

  const handleSubmit = async () => {
    const iQuizSubmit = [...answers]
    try {
      const response = await submitQuizzes(iQuizSubmit).unwrap()
      if (response !== undefined) {
        const { candidates } = response?.data || {}
        const contentHtml = candidates?.[0]?.content?.parts?.[0]?.text || ''

        // Extract content parts using regular expressions
        const scoreMatch = contentHtml.match(/<p>Điểm số: (\d+)<\/p>/)
        const resultMatch = contentHtml.match(/<p>Kết quả: (.*?)<\/p>/)
        const explanationMatch = contentHtml.match(/<p>Giải thích: (.*?)<\/p>/)
        const suggestionsMatch = contentHtml.match(/<ul>(.*?)<\/ul>/s)

        // Build an object with extracted data
        const testResult = {
          score: scoreMatch ? parseInt(scoreMatch[1], 10) : null,
          result: resultMatch ? resultMatch[1].trim() : null,
          explanation: explanationMatch ? explanationMatch[1].trim() : null,
          suggestions: suggestionsMatch ? suggestionsMatch[1].trim() : null,
        }
        // Set the result object for display or further use
        setTestResult(testResult)
        console.log('Extracted Test Result:', testResult)
      }
    } catch (error) {
      console.error('Submit failed:', error)
    }
  }

  React.useEffect(() => {
    if (
      listQuiz.length !== 0 &&
      answers.length === listQuiz.length &&
      !hasSubmitted
    ) {
      handleSubmit()
      setHasSubmitted(true)
    }
  }, [answers, listQuiz, hasSubmitted])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        height: step === listQuiz.length + 1 ? 'fit-content' : '600px',

        padding: '30px',
      }}
    >
      {step === 0 && <Introduction onNext={handleNextStep} />}
      {step > 0 && step <= listQuiz.length && (
        <Question
          id={listQuiz[step - 1]?.id || 0}
          question={listQuiz[step - 1]?.question || ''}
          choice={listQuiz[step - 1]?.choice || []}
          onAnswer={handleAnswer}
        />
      )}
      {step > listQuiz?.length && !testResult && (
        <Box>
          <LazyLoadingQuiz />
        </Box>
      )}
      {step > listQuiz?.length && testResult && (
        <Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '16px',
              marginBottom: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                marginBottom: '30px',
              }}
            >
              <Box
                component={'img'}
                src={logo}
                sx={{
                  width: '100px',
                  height: '100px',
                }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Typography variant='h4' mb={2} color='#3C5EAB'>
                  BÁO CÁO KẾT QUẢ ĐÁNH GIÁ TRẦM CẢM
                </Typography>
                <Stack
                  display={'flex'}
                  flexDirection={'row'}
                  gap={2}
                  width={'fit-content'}
                >
                  <Button
                    variant='contained'
                    startIcon={<FileDownloadOutlinedIcon />}
                  >
                    Tải về
                  </Button>
                  <Button variant='contained' startIcon={<EmailOutlinedIcon />}>
                    Gửi email
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mb: 2,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: '50%',
                }}
              >
                <Typography variant='h6' mb={1} color={'#65AD45'}>
                  1. Thông tin chung
                </Typography>
                <Box
                  sx={{
                    color: '#fff',
                    backgroundColor: '#65AD45',
                    padding: '20px',
                    borderRadius: '16px',
                    '& table': {
                      width: '100%',
                      '& tbody': {
                        '& td': {
                          padding: '8px',
                        },
                      },
                    },
                  }}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td> Họ và tên:</td>
                        <td>Nguyễn Văn A</td>
                      </tr>
                      <tr>
                        <td> Tuổi:</td>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td> Giới tính:</td>
                        <td>Nam</td>
                      </tr>
                      <tr>
                        <td> Ngày sinh:</td>
                        <td>01/01/1996</td>
                      </tr>
                      <tr>
                        <td> Thời gian hoàn thành:</td>
                        <td>10:00 01/01/2022</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '50%',
                  color: '#000',
                }}
              >
                <Typography variant='h6' mb={1} color='#65AD45'>
                  2. Giải thích về bảng điểm
                </Typography>
                <Box
                  sx={{
                    border: '2px solid #65AD45',
                    padding: '20px',
                    borderRadius: '16px',
                  }}
                >
                  {depressionLevels.map((level, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        p: '8px',
                      }}
                    >
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: level.color,
                          border: level.hasBorder
                            ? `2px solid ${level.border}`
                            : 'none',
                        }}
                      ></Box>
                      <Box sx={{ marginLeft: '10px' }}>{level.label}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
            <Box mb={2}>
              <Typography variant='h6' mb={1} color='#65AD45'>
                3. Kết quả
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  '& table': {
                    width: '100%',
                    borderCollapse: 'separate', // Thay đổi từ 'collapse' sang 'separate' để bo tròn góc
                    borderSpacing: '0', // Đặt khoảng cách giữa các ô về 0
                    border: '1px solid #65AD45',
                    borderRadius: '16px', // Áp dụng border-radius cho bảng
                    overflow: 'hidden', // Đảm bảo bo tròn góc cho các cạnh của bảng
                    '& thead': {
                      '& th': {
                        backgroundColor: '#65AD45',
                        padding: '8px',
                        textAlign: 'center',
                      },
                    },
                    '& th, & td': {
                      border: '1px solid #ddd',
                      padding: '8px',
                      textAlign: 'center',
                    },
                    '& th': {
                      backgroundColor: '#f2f2f2',
                    },
                    '& tr:first-child th:first-child': {
                      borderTopLeftRadius: '16px', // Góc trên bên trái
                    },
                    '& tr:first-child th:last-child': {
                      borderTopRightRadius: '16px', // Góc trên bên phải
                    },
                    '& tr:last-child td:first-child': {
                      borderBottomLeftRadius: '16px', // Góc dưới bên trái
                    },
                    '& tr:last-child td:last-child': {
                      borderBottomRightRadius: '16px', // Góc dưới bên phải
                    },
                  },
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Lĩnh Vực</th>
                      <th>Điểm</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Trầm cảm</td>
                      <td>{testResult.score}</td>
                      <td>
                        <Box
                          sx={{
                            width: '100%',
                            height: '20px',
                            background: `linear-gradient(to right,
                              ${depressionLevels[1].color} 0%,
                              ${depressionLevels[1].color} 30%, /* Vùng an toàn (0-3) */
                              ${depressionLevels[2].color} 30%,
                              ${depressionLevels[2].color} 60%, /* Trầm cảm nhẹ (4-6) */
                              ${depressionLevels[3].color} 60%,
                              ${depressionLevels[3].color} 90%, /* Trầm cảm trung bình (7-9) */
                              ${depressionLevels[4].color} 90% 100%)` /* Trầm cảm nặng (10) */,
                            borderRadius: '10px',
                            position: 'relative', // Thêm relative để căn chỉnh vòng tròn trắng
                            marginBottom: '20px',
                          }}
                        >
                          {/* Vòng tròn trắng biểu thị điểm */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '-5px',
                              left: `70%`,
                              transform: 'translateX(-50%)',
                              width: '30px',
                              height: '30px',
                              backgroundColor: '#fff',
                              borderRadius: '50%',
                              border: '2px solid #000',
                            }}
                          />
                        </Box>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Typography variant='h6' mb={1} mt={2} color='#65AD45'>
                4. Mô tả kết quả
              </Typography>
              {testResult && (
                <Box
                  sx={{
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '2px solid #65AD45',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '1.2rem',
                    lineHeight: '1.6',
                  }}
                >
                  <Typography variant='h6' color='initial'>
                    <strong>Kết quả: </strong>
                    {testResult.result && parse(testResult.result)}
                  </Typography>
                  <Typography variant='h6' color='initial' fontWeight={'bold'}>
                    Giải thích kết quả:
                  </Typography>
                  <Box pl={1}>
                    {testResult.explanation && parse(testResult.explanation)}
                  </Box>
                  <Typography variant='h6' color='initial' fontWeight={'bold'}>
                    Tham khảo:
                  </Typography>
                  <Box pl={1}>
                    {testResult.suggestions && parse(testResult.suggestions)}
                  </Box>

                  <Typography
                    variant='body1'
                    color='textSecondary'
                    mt={3}
                    textAlign={'center'}
                  >
                    Kết quả chỉ mang tính chất tham khảo.
                  </Typography>
                </Box>
              )}
            </Box>
            <Button
              variant='contained'
              onClick={handleRestart}
              startIcon={<AutorenewIcon />}
              sx={{ marginRight: 1 }}
            >
              Làm lại
            </Button>
          </Box>
          <Box>
            <SuggestDoctors />
          </Box>
        </Box>
      )}
    </Box>
  )
}
