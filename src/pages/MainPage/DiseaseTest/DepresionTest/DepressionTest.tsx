import { Box, Button, Typography, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/logo.png'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import SuggestDoctors from '../../../../components/mainPage/SuggestDoctors'
import AutorenewIcon from '@mui/icons-material/Autorenew'
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
const getCirclePosition = (score: number) => {
  // Position the circle based on score (0 to 10)
  return `${(score / 10) * 100}%`
}

const questions = [
  {
    question: 'Bạn có cảm thấy buồn chán hoặc tuyệt vọng không?',
    answers: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'],
  },
  {
    question: 'Bạn có cảm thấy mất hứng thú với các hoạt động hàng ngày không?',
    answers: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'],
  },
  {
    question: 'Bạn có cảm thấy mệt mỏi hoặc thiếu năng lượng không?',
    answers: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'],
  },
]

interface QuestionProps {
  question: string
  answers: string[]
  onAnswer: (answerIndex: number) => void
}

const Question = ({ question, answers, onAnswer }: QuestionProps) => {
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
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {answers.map((answer, index) => (
          <Button
            variant='outlined'
            color='primary'
            sx={{ margin: '8px' }}
            key={index}
            onClick={() => onAnswer(index)}
          >
            {answer}
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
const getDepressionLevel = (score: number) => {
  if (score <= 3) return 1 // Vùng an toàn
  if (score <= 6) return 2 // Vùng trầm cảm nhẹ
  if (score <= 9) return 3 // Vùng trầm cảm vừa
  return 4 // Vùng trầm cảm nặng
}
export default function DepressionTest() {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<number[]>([])

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prevAnswers => [...prevAnswers, answerIndex])
    handleNextStep()
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers([])
  }
  const getCirclePosition = (score: number) => {
    // Chia thang điểm từ 0 đến 10 thành các phần
    return `${(score / 10) * 100}%`
  }

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0)
  const depressionLevel = getDepressionLevel(totalScore)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        height: step > questions.length ? 'fit-content' : '600px',

        padding: '30px',
      }}
    >
      {step === 0 && <Introduction onNext={handleNextStep} />}
      {step > 0 && step <= questions.length && (
        <Question
          question={questions[step - 1].question}
          answers={questions[step - 1].answers}
          onAnswer={handleAnswer}
        />
      )}
      {step > questions.length && (
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
                      <td>{totalScore}</td>
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
                              left: getCirclePosition(totalScore), // Vị trí của vòng tròn dựa trên tổng điểm
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
