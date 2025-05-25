import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
// src/components/ui 폴더에서 실제 컴포넌트들을 임포트합니다.
import { Button } from './components/ui/button.js';
import { Input } from './components/ui/input.js';
import { Textarea } from './components/ui/textarea.js';
import { Checkbox } from './components/ui/checkbox.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select.js';
import { Slider } from './components/ui/slider.js';

// Lucide React Icons (assuming they are available or can be replaced with inline SVGs/emojis)
import { MessageCircle, FileText, User, Heart, Home, LogIn, UserPlus, X, ChevronLeft, Send, CheckCircle, Award, Star, Settings, DollarSign, Brain, List, MessageSquare } from 'lucide-react'; // Brain, List, MessageSquare 아이콘 추가

// User context for global state management (login, paid status, selected AI Manager)
const UserContext = createContext(null);

// --- Components for each screen ---

// Landing Page
const LandingScreen = ({ setCurrentScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <h1 className="text-4xl font-extrabold mb-4 animate-fade-in-down">AI 매칭 에이전트</h1>
      <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 shadow-lg animate-scale-in">
        <span className="text-7xl">🤖</span>
      </div>
      <p className="text-xl text-indigo-100 mb-10 animate-fade-in-up">사람과 사람을 연결하는 AI, 해로</p>
      <div className="flex flex-col space-y-4 w-full max-w-xs animate-fade-in-up">
        <Button className="w-full bg-white text-indigo-700 hover:bg-gray-100 shadow-md" onClick={() => setCurrentScreen('personalityTestGuestScreen')}>
          무료 성향 테스트 시작하기
        </Button>
        <Button className="w-full bg-transparent border border-white hover:bg-white hover:bg-opacity-20 shadow-md" variant="outline" onClick={() => setCurrentScreen('signupScreen')}>
          회원가입
        </Button>
        <p className="text-sm text-indigo-200 mt-4">
          이미 회원이신가요?{' '}
          <a href="#" className="font-semibold underline" onClick={() => setCurrentScreen('loginScreen')}>
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

// Login Screen
const LoginScreen = ({ setCurrentScreen }) => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login success
    login();
    alert('로그인 성공! 유료 회원으로 전환됩니다.');
    setCurrentScreen('mainDashboardScreen');
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">로그인</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('landingScreen')}>
          <X className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto pb-4">
        <div className="mb-4">
          <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
            이메일
          </label>
          <Input id="loginEmail" type="email" placeholder="이메일 주소를 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호
          </label>
          <Input id="loginPassword" type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full" onClick={handleLogin}>
          로그인
        </Button>
        <p className="text-center text-sm text-gray-500 mt-6">
          아직 회원이 아니신가요?{' '}
          <a href="#" className="text-indigo-600 font-semibold hover:underline" onClick={() => setCurrentScreen('signupScreen')}>
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

// Signup Screen
const SignupScreen = ({ setCurrentScreen }) => {
  const { signup } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreeTerms) {
      alert('이용약관에 동의해야 합니다.');
      return;
    }
    // Simulate signup success
    signup();
    alert('회원가입 성공! 무료 회원으로 시작합니다.');
    setCurrentScreen('aiManagerListScreen'); // 회원가입 후 AI 매니저 목록 화면으로 이동
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">회원가입</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('landingScreen')}>
          <X className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto pb-4">
        <div className="mb-4">
          <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
            이메일
          </label>
          <Input id="signupEmail" type="email" placeholder="이메일 주소를 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호
          </label>
          <Input id="signupPassword" type="password" placeholder="비밀번호를 입력하세요 (8자 이상)" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="signupConfirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            비밀번호 확인
          </label>
          <Input id="signupConfirmPassword" type="password" placeholder="비밀번호를 다시 입력하세요" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <Checkbox id="agreeTerms" checked={agreeTerms} onCheckedChange={setAgreeTerms} className="mb-6">
          개인정보처리방침 및 이용약관에 동의합니다.
        </Checkbox>
        <Button className="w-full" onClick={handleSignup}>
          가입하기
        </Button>
        <p className="text-center text-sm text-gray-500 mt-6">
          아직 회원이 아니신가요?{' '}
          <a href="#" className="text-indigo-600 font-semibold hover:underline" onClick={() => setCurrentScreen('loginScreen')}>
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

// Personality Test for Guests
const PersonalityTestGuestScreen = ({ setCurrentScreen }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      id: 1,
      text: '주말에 주로 무엇을 하시나요?',
      options: ['집에서 휴식', '친구들과 외출', '취미 활동'],
    },
    {
      id: 2,
      text: '새로운 사람을 만날 때 어떤 느낌이 드나요?',
      options: ['설렘', '긴장', '무관심'],
    },
    {
      id: 3,
      text: '갈등 상황에서 당신의 반응은?',
      options: ['적극적으로 해결', '회피', '타협'],
    },
    {
      id: 4,
      text: '결혼 후 가장 중요하다고 생각하는 것은?',
      options: ['경제적 안정', '정서적 교류', '공동의 목표'],
    },
    {
      id: 5,
      text: '당신이 생각하는 이상적인 데이트는?',
      options: ['활동적인 야외 데이트', '조용한 실내 데이트', '맛있는 음식 탐방'],
    },
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('테스트가 완료되었습니다! 회원가입하고 더 많은 기능을 이용해 보세요.');
      setCurrentScreen('signupScreen');
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">무료 성향 테스트</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('landingScreen')}>
          <X className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto pb-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">나의 결혼 만족도 성향은?</h3>
        <p className="text-gray-600 mb-6">몇 가지 질문으로 당신의 결혼 성향을 파악해 보세요.</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left">
          <p className="text-lg font-medium text-gray-800 mb-4">
            {currentQuestion + 1}. {questions[currentQuestion].text}
          </p>
          <div className="flex flex-col space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button key={index} variant="outline" className="w-full text-base" onClick={() => alert(`'${option}' 선택!`)}>
                {option}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          진행률: {currentQuestion + 1}/{questions.length}
        </p>

        <Button className="w-full mt-8" onClick={handleNextQuestion}>
          {currentQuestion < questions.length - 1 ? '다음 질문' : '결과 확인 및 회원가입'}
        </Button>
        <p className="text-center text-sm text-gray-500 mt-4">
          테스트 결과를 저장하고 AI와 상담하고 싶으신가요?{' '}
          <a href="#" className="text-indigo-600 font-semibold hover:underline" onClick={() => setCurrentScreen('signupScreen')}>
            회원가입하고 시작하기
          </a>
        </p>
      </div>
    </div>
  );
};


// Personality Test (for Logged-in Users)
const PersonalityTestScreen = ({ setCurrentScreen }) => {
  const { userState } = useContext(UserContext);
  const [activeTestTab, setActiveTestTab] = useState('all');

  const allTests = [
    { id: 1, name: '결혼 만족도 성향 테스트', status: 'completed', description: '행복한 결혼 생활을 위한 당신의 잠재력을 알아봅니다.' },
    { id: 2, name: '가치관 일치도 테스트', status: 'not-started', description: '파트너와 중요하게 생각하는 가치가 얼마나 일치하는지 확인합니다.' },
    { id: 3, name: '스트레스 대응 방식 테스트', status: 'completed', description: '갈등 상황에서 당신이 어떻게 반응하는지 파악합니다.' },
    { id: 4, name: '애정 표현 유형 테스트', status: 'not-started', description: '당신이 선호하는 애정 표현 방식과 상대방에게 기대하는 바를 알아봅니다.' },
  ];

  const myTests = allTests.filter(test => test.status === 'completed');
  const notStartedTests = allTests.filter(test => test.status === 'not-started');

  const getTestsForTab = () => {
    switch (activeTestTab) {
      case 'all': return allTests;
      case 'my': return myTests;
      case 'not-started': return notStartedTests;
      default: return [];
    }
  };

  const currentTests = getTestsForTab();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">성향 테스트</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(userState.isLoggedIn ? (userState.isPaid ? 'mainDashboardScreen' : 'aiManagerListScreen') : 'landingScreen')}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex space-x-2 text-sm font-semibold text-gray-600 overflow-x-auto pb-2">
          <Button variant={activeTestTab === 'all' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTestTab('all')}>
            전체 리스트 ({allTests.length})
          </Button>
          <Button variant={activeTestTab === 'my' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTestTab('my')}>
            내가 해봤던 테스트 ({myTests.length})
          </Button>
          <Button variant={activeTestTab === 'not-started' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTestTab('not-started')}>
            아직 안한 테스트 ({notStartedTests.length})
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {currentTests.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            {activeTestTab === 'all' && "표시할 성향 테스트가 없습니다."}
            {activeTestTab === 'my' && "아직 완료한 성향 테스트가 없습니다."}
            {activeTestTab === 'not-started' && "모든 성향 테스트를 완료하셨습니다!"}
          </div>
        ) : (
          currentTests.map(test => (
            <div key={test.id} className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{test.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{test.description}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${test.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {test.status === 'completed' ? '완료됨' : '미진행'}
                </span>
                {test.status === 'completed' ? (
                  <Button size="sm" variant="outline" onClick={() => alert(`${test.name} 결과 보기`)}>
                    결과 보기
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => alert(`${test.name} 시작하기`)}>
                    테스트 시작
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="personalityTest" />
    </div>
  );
};


// AI Chat Screen
const ChatScreen = ({ setCurrentScreen, selectedAIManagerPersona, setSelectedAIManagerPersona }) => {
  const { userState, upgradeToPaid } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  const aiManagers = {
    friendly: {
      name: '친절한 해로',
      initialGreeting: (userName) => `안녕하세요, ${userName}님! 저는 친절한 해로입니다. 어떤 이야기를 나눠볼까요? 😊`,
      responses: {
        default: '네, 말씀 잘 들었습니다! 더 궁금한 점이 있으신가요?',
        weekend: '주말에는 주로 어떤 활동을 즐기시나요? 저는 편안한 휴식을 추천해 드리고 싶어요!',
        hobby: '취미에 대해 더 자세히 알려주실 수 있을까요? 당신의 열정을 함께 나눌 수 있는 사람을 찾아볼게요!',
        work: '직장 생활은 어떠신가요? 혹시 스트레스가 있으시다면 저에게 털어놓으셔도 좋아요!',
        test: '성향 테스트에 관심이 있으시군요! 현재 진행하지 않은 테스트가 있다면 제가 추천해 드릴 수 있어요. 바로 시작해볼까요?',
        matching_intro: '매칭 시스템에 대해 설명해 드릴게요. 저희 해로는 주 2명씩 추천해 드리고, 서로 픽이 되어야만 매칭이 성사된답니다. 궁금한 점이 있으시면 언제든 물어보세요!',
        contact: '미팅 1일 전에 상대방의 연락처를 안전하게 전달해 드릴 거예요. 걱정 마세요!',
        meeting_schedule: '미팅 일정 조율은 제가 전담해서 도와드릴 수 있어요. 원하시는 시간과 장소를 말씀해주시면 제가 조율해 볼게요!',
        feedback: '미팅 후에는 꼭 저에게 후기를 남겨주세요! 소중한 피드백은 다음 매칭에 큰 도움이 된답니다. 😉',
        ideal_type: '이상형에 대해 이야기하고 싶으시군요! 현재 설정된 이상형을 불러와서 수정하거나, 새로운 조건을 추가할 수도 있어요. 어떤 부분을 조정하고 싶으신가요?',
        data_collection: '말씀해주신 내용은 소중한 데이터로 잘 저장해 두겠습니다! 앞으로 더 정확한 매칭을 위해 활용될 거예요. 😊',
        unknown: '음... 죄송하지만 제가 이해하지 못했어요. 좀 더 명확하게 말씀해주시거나, 다른 질문을 해주실 수 있을까요?',
        paid_feature_promo: '이 기능은 유료 회원 전용입니다. 지금 유료로 전환하시면 더 많은 이성들을 만나볼 수 있어요!',
        paid_feature_t_f: '사주/타로 상담은 유료 회원 전용 기능입니다.',
        paid_user_promo: '오늘의 추천 이성을 확인해 보세요!',
        paid_user_t_f: '사주/타로 상담을 시작할까요?',
      }
    },
    logical: {
      name: '논리적인 해로',
      initialGreeting: (userName) => `안녕하십니까, ${userName}님. 논리적 사고를 기반으로 한 AI 매니저 해로입니다. 무엇을 도와드릴까요?`,
      responses: {
        default: '확인되었습니다. 추가 문의 사항이 있으십니까?',
        weekend: '주말 활동 패턴은 개인의 가치관을 반영합니다. 일반적으로 어떤 활동을 선호하십니까? 데이터 수집에 도움이 됩니다.',
        hobby: '구체적인 취미 활동 정보는 매칭 대상과의 공통점을 파악하는 데 유용합니다. 해당 정보를 더 자세히 알려주십시오.',
        work: '직장 생활의 특성 및 만족도는 파트너십 형성의 중요한 요소입니다. 현재 직업 환경에 대한 정보가 필요합니다.',
        test: '성향 테스트는 사용자의 결혼 만족도 및 가치관 유형을 정량적으로 분석합니다. 미진행 테스트를 추천할 수 있으며, 즉시 진행을 원하십니까?',
        matching_intro: '본 서비스의 매칭 시스템은 주간 2회 추천을 기본으로 하며, 상호 픽을 통해 매칭이 성사됩니다. 이 과정에 대한 추가적인 정보가 필요하십니까?',
        contact: '파트너의 연락처는 미팅 예정일 기준 24시간 전 자동으로 제공됩니다. 현재 정책상 미리 제공되지 않습니다.',
        meeting_schedule: '미팅 일정 및 장소는 AI가 최적화하여 조율합니다. 사용자 선호도를 입력해주시면 효율적인 스케줄링이 가능합니다.',
        feedback: '미팅 후 피드백은 AI 매칭 알고리즘의 개선에 필수적인 데이터입니다. 정량적이고 객관적인 평가를 부탁드립니다.',
        ideal_type: '이상형 정보는 매칭 알고리즘의 핵심 입력값입니다. 현재 설정된 이상형 조건을 열람 및 수정하거나, 세부 조건을 추가할 수 있습니다. 어떤 항목을 조정하시겠습니까?',
        data_collection: '제공된 정보는 시스템 내 데이터베이스에 저장되어 향후 매칭 정확도 향상에 기여할 것입니다. 감사합니다.',
        unknown: '입력하신 내용은 현재 분석 범위에 포함되지 않습니다. 유효한 질문을 다시 입력하시거나, 문의 유형을 명확히 해주십시오.',
        paid_feature_promo: '해당 기능은 유료 서비스입니다. 결제 시 모든 매칭 기능을 활성화할 수 있습니다.',
        paid_feature_t_f: '사주/타로 서비스는 유료 회원 전용입니다.',
        paid_user_promo: '금일 추천 이성 목록을 확인하여 주십시오.',
        paid_user_t_f: '사주/타로 상담을 즉시 시작하시겠습니까?',
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const currentManager = aiManagers[selectedAIManagerPersona];
    if (currentManager) {
      setMessages([{ type: 'ai', sender: currentManager.name, text: currentManager.initialGreeting(userState.userName || '사용자') }]);
    }
  }, [selectedAIManagerPersona, userState.userName]);


  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = inputMessage;
    setMessages((prevMessages) => [...prevMessages, { type: 'user', sender: '나', text: userMessage }]);
    setInputMessage('');

    const currentManager = aiManagers[selectedAIManagerPersona];
    let aiResponseText = currentManager.responses.default;
    let aiAction = null; // Optional action for AI message

    const lowerCaseMessage = userMessage.toLowerCase();

    // AI response logic based on keywords (dummy data simulation)
    if (lowerCaseMessage.includes('주말') || lowerCaseMessage.includes('쉬다') || lowerCaseMessage.includes('놀다')) {
      aiResponseText = currentManager.responses.weekend;
    } else if (lowerCaseMessage.includes('취미') || lowerCaseMessage.includes('활동')) {
      aiResponseText = currentManager.responses.hobby;
    } else if (lowerCaseMessage.includes('직장') || lowerCaseMessage.includes('일') || lowerCaseMessage.includes('회사')) {
      aiResponseText = currentManager.responses.work;
    } else if (lowerCaseMessage.includes('테스트') || lowerCaseMessage.includes('성향')) {
      aiResponseText = currentManager.responses.test;
      aiAction = () => setCurrentScreen('personalityTestScreen');
    } else if (lowerCaseMessage.includes('매칭') || lowerCaseMessage.includes('추천')) {
      aiResponseText = currentManager.responses.matching_intro;
      aiAction = () => setCurrentScreen('matchingListScreen');
    } else if (lowerCaseMessage.includes('연락처')) {
      aiResponseText = currentManager.responses.contact;
    } else if (lowerCaseMessage.includes('미팅') || lowerCaseMessage.includes('일정') || lowerCaseMessage.includes('장소')) {
      aiResponseText = currentManager.responses.meeting_schedule;
    } else if (lowerCaseMessage.includes('후기')) {
      aiResponseText = currentManager.responses.feedback;
      aiAction = () => setCurrentScreen('feedbackScreen');
    } else if (lowerCaseMessage.includes('이상형') || lowerCaseMessage.includes('조건')) {
      aiResponseText = currentManager.responses.ideal_type;
      aiAction = () => setCurrentScreen('myIdealTypeScreen');
    } else if (lowerCaseMessage.includes('고맙다') || lowerCaseMessage.includes('감사합니다')) {
      aiResponseText = currentManager.responses.data_collection;
    } else if (lowerCaseMessage.includes('오늘') || lowerCaseMessage.includes('하루')) {
      aiResponseText = `오늘 하루는 어떠셨나요, ${userState.userName || '사용자'}님?`;
    }
    // 사주/타로 관련 키워드 추가 (유료 기능 안내와 연결)
    else if (lowerCaseMessage.includes('사주') || lowerCaseMessage.includes('타로') || lowerCaseMessage.includes('운세')) {
        aiResponseText = currentManager.responses.paid_feature_t_f;
        aiAction = userState.isPaid ? null : () => setCurrentScreen('paymentScreen'); // 유료가 아니면 결제 화면으로 이동
    }
    else {
      aiResponseText = currentManager.responses.unknown;
    }

    // Simulate AI typing delay
    setTimeout(() => {
      let additionalMessages = [];

      // 유료/무료 프로모션 메시지 중복 방지 로직 강화
      // 마지막 메시지가 프로모션이거나, 현재 응답이 프로모션 관련 응답이 아닐 때만 추가
      const lastMessage = messages[messages.length - 1];
      const isLastMessagePromo = lastMessage && lastMessage.type === 'ai' && (
        lastMessage.text === currentManager.responses.paid_feature_promo ||
        lastMessage.text === currentManager.responses.paid_user_promo ||
        lastMessage.text === currentManager.responses.paid_feature_t_f ||
        lastMessage.text === currentManager.responses.paid_user_t_f
      );

      if (!isLastMessagePromo && aiResponseText !== currentManager.responses.paid_feature_promo && aiResponseText !== currentManager.responses.paid_user_promo) {
          if (!userState.isPaid) {
              additionalMessages.push({ type: 'ai', sender: currentManager.name, text: currentManager.responses.paid_feature_promo, action: () => setCurrentScreen('paymentScreen') });
          } else {
              additionalMessages.push({ type: 'ai', sender: currentManager.name, text: currentManager.responses.paid_user_promo, action: () => setCurrentScreen('matchingListScreen') });
          }
      }


      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'ai', sender: currentManager.name, text: aiResponseText, action: aiAction },
        ...additionalMessages
      ]);
    }, 1000);
  };


  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">{aiManagers[selectedAIManagerPersona]?.name || 'AI 매니저 해로'}</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('aiManagerListScreen')}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="chat-message-container flex flex-col flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'} mb-3`}>
            <div className={`flex flex-col ${msg.type === 'ai' ? 'items-start' : 'items-end'}`}>
              <span className="text-xs text-gray-500 mb-1">{msg.sender}</span>
              <div className={`p-3 rounded-lg max-w-[70%] ${msg.type === 'ai' ? 'bg-white text-gray-800 rounded-bl-none shadow' : 'bg-indigo-500 text-white rounded-br-none shadow'}`}>
                {msg.text}
                {msg.action && (
                  <Button variant="link" className={`text-sm p-0 h-auto ml-2 ${msg.type === 'ai' ? 'text-indigo-600' : 'text-white'}`} onClick={msg.action}>
                    바로가기
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <Input
          type="text"
          className="chat-input"
          placeholder="메시지를 입력하세요..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button className="chat-send-btn" onClick={handleSendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="chat" />
    </div>
  );
};

// AI Manager List Screen
const AIManagerListScreen = ({ setCurrentScreen }) => {
  const { userState, setSelectedAIManagerPersona } = useContext(UserContext);

  const aiManagerPersonas = [
    { id: 'friendly', name: '친절한 해로', description: '따뜻하고 공감 능력이 뛰어난 매니저', avatar: 'https://placehold.co/80x80/6366f1/ffffff?text=😊' },
    { id: 'logical', name: '논리적인 해로', description: '데이터 기반의 분석적인 매칭 전문가', avatar: 'https://placehold.co/80x80/8b5cf6/ffffff?text=🧠' },
    // 여기에 추가 페르소나를 정의할 수 있습니다.
    // { id: 'humorous', name: '유머러스한 해로', description: '재치 있는 입담으로 즐거움을 주는 매니저', avatar: 'https://placehold.co/80x80/ec4899/ffffff?text=😂' },
  ];

  const handleSelectManager = (personaId) => {
    setSelectedAIManagerPersona(personaId);
    setCurrentScreen('chatScreen');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">AI 매니저 선택</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(userState.isLoggedIn ? (userState.isPaid ? 'mainDashboardScreen' : 'aiManagerListScreen') : 'landingScreen')}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <p className="text-gray-600 text-center mb-4">원하는 AI 매니저를 선택하여 대화를 시작해 보세요!</p>
        {aiManagerPersonas.map((manager) => (
          <div
            key={manager.id}
            className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => handleSelectManager(manager.id)}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img src={manager.avatar} alt={manager.name} className="object-cover w-full h-full" />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-gray-800">{manager.name}</h3>
              <p className="text-sm text-gray-600">{manager.description}</p>
            </div>
            <MessageSquare className="h-6 w-6 text-indigo-600" />
          </div>
        ))}
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="chat" />
    </div>
  );
};


// My Profile Screen
const MyProfileScreen = ({ setCurrentScreen }) => {
  const { userState, upgradeToPaid } = useContext(UserContext);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">MY 프로필</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(userState.isLoggedIn ? (userState.isPaid ? 'mainDashboardScreen' : 'aiManagerListScreen') : 'landingScreen')}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm mb-3 overflow-hidden shadow-md">
            <img src="https://placehold.co/120x120/E0E7FF/6366F1?text=내+사진" alt="My Profile" className="object-cover w-full h-full" />
          </div>
          <Button variant="outline" className="text-sm">
            프로필 사진 변경
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
          <Input value="김해로" disabled />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">나이</label>
          <Input value="30세" disabled />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">직업</label>
          <Input value="AI 매니저" disabled />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">자기소개</label>
          <Textarea placeholder="자신을 소개하는 글을 작성해주세요.">
            안녕하세요! 저는 AI 매칭 에이전트 해로입니다. 당신의 완벽한 인연을 찾아드리겠습니다.
          </Textarea>
        </div>

        {userState.isPaid ? (
          <div className="mt-6 p-5 border border-blue-200 rounded-lg bg-blue-50 shadow-sm">
            <h3 className="font-bold text-lg text-blue-800 mb-3">필수 인증 서류</h3>
            <p className="text-sm text-gray-700 mb-4">정확한 매칭을 위해 아래 서류들을 인증해주세요.</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>
                자산 증빙 서류 (등기부등본 등){' '}
                <span className="text-green-600 font-semibold flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" /> (인증 완료)
                </span>
              </li>
              <li>
                연봉 증빙 서류 (원천징수 영수증 등){' '}
                <span className="text-red-600 font-semibold flex items-center">
                  <X className="h-4 w-4 mr-1" /> (미인증)
                </span>
              </li>
              <li>
                학력 증빙 서류 (졸업 증명서){' '}
                <span className="text-green-600 font-semibold flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" /> (인증 완료)
                </span>
              </li>
              <li>
                건강검진 정보{' '}
                <span className="text-red-600 font-semibold flex items-center">
                  <X className="h-4 w-4 mr-1" /> (미인증)
                </span>
              </li>
            </ul>
            <Button variant="secondary" className="w-full mt-5" onClick={() => alert('서류 업로드 페이지로 이동합니다.')}>
              서류 업로드/관리
            </Button>
          </div>
        ) : (
          <div className="mt-6 p-5 border border-yellow-200 rounded-lg bg-yellow-50 shadow-sm">
            <h3 className="font-bold text-lg text-yellow-800 mb-3">매칭을 위한 추가 정보</h3>
            <p className="text-sm text-gray-700 mb-4">정확한 매칭을 위해 자산, 학력, 직업 등 필수 정보 인증이 필요합니다.</p>
            <Button className="w-full" onClick={() => setCurrentScreen('paymentScreen')}>
              유료 회원으로 전환하기
            </Button>
          </div>
        )}
        <Button className="w-full mt-6">프로필 저장</Button>
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="my" />
    </div>
  );
};

// My Ideal Type Screen
const MyIdealTypeScreen = ({ setCurrentScreen }) => {
  const { userState } = useContext(UserContext);
  const [ageRange, setAgeRange] = useState([28, 35]);
  const [heightRange, setHeightRange] = useState([170, 180]);
  const [personality, setPersonality] = useState('');
  const [job, setJob] = useState('');

  const [familyComposition, setFamilyComposition] = useState('');
  const [preferredRegion, setPreferredRegion] = useState('');
  const [preferredHobby, setPreferredHobby] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [assetRange, setAssetRange] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [appearancePreference, setAppearancePreference] = useState('');
  const [celebrityIdealType, setCelebrityIdealType] = useState('');
  const [hairLossStatus, setHairLossStatus] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [weightPersonality, setWeightPersonality] = useState([8]);
  const [weightEconomy, setWeightEconomy] = useState([7]);
  const [weightAppearance, setWeightAppearance] = useState([6]);


  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">나의 이상형</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(userState.isLoggedIn ? (userState.isPaid ? 'mainDashboardScreen' : 'aiManagerListScreen') : 'landingScreen')}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        {/* 인적 사항 섹션 */}
        <h3 className="font-bold text-lg text-gray-800 mb-4">인적 사항</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">나이 범위</label>
          <Input value={`${ageRange[0]}세 ~ ${ageRange[1]}세`} disabled />
          <Slider value={ageRange} onValueChange={setAgeRange} min={20} max={60} step={1} className="mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">키 범위</label>
          <Input value={`${heightRange[0]}cm ~ ${heightRange[1]}cm`} disabled />
          <Slider value={heightRange} onValueChange={setHeightRange} min={150} max={200} step={1} className="mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">가족 구성</label>
          <Input placeholder="예: 2남 1녀 중 막내, 외동 등" value={familyComposition} onChange={(e) => setFamilyComposition(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">사는 지역</label>
          <Input placeholder="예: 서울, 경기도 등" value={preferredRegion} onChange={(e) => setPreferredRegion(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">선호 취미</label>
          <Input placeholder="예: 독서, 운동, 여행 등" value={preferredHobby} onChange={(e) => setPreferredHobby(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">성격</label>
          <Input placeholder="예: 밝고 긍정적인 성격" value={personality} onChange={(e) => setPersonality(e.target.value)} />
        </div>

        {/* 능력 섹션 */}
        <h3 className="font-bold text-lg text-gray-800 mb-4 mt-8">능력</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">학력</label>
          <Input placeholder="예: 4년제 대졸, 대학원 재학 등" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">직업</label>
          <Input placeholder="예: 전문직, IT 개발자" value={job} onChange={(e) => setJob(e.target.value)} />
        </div>

        {/* 재력 섹션 */}
        <h3 className="font-bold text-lg text-gray-800 mb-4 mt-8">재력</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">자산 Range</label>
          <Input placeholder="예: 5억 이상, 10억 ~ 20억" value={assetRange} onChange={(e) => setAssetRange(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">연봉 Range</label>
          <Input placeholder="예: 5천만원 이상, 7천만원 ~ 1억" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} />
        </div>

        {/* 외형 섹션 */}
        <h3 className="font-bold text-lg text-gray-800 mb-4 mt-8">외형</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">외모 취향</label>
          <Input placeholder="예: 깔끔한 인상, 귀여운 스타일 등" value={appearancePreference} onChange={(e) => setAppearancePreference(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">연예인/운동선수 이상형</label>
          <Input placeholder="예: 아이유, 손흥민" value={celebrityIdealType} onChange={(e) => setCelebrityIdealType(e.target.value)} />
        </div>

        {/* 기타 섹션 */}
        <h3 className="font-bold text-lg text-gray-800 mb-4 mt-8">기타</h3>
        <div className="mb-4">
          <label htmlFor="hairLoss" className="block text-sm font-medium text-gray-700 mb-2">탈모 여부</label>
          <Select value={hairLossStatus} onValueChange={setHairLossStatus}>
            <SelectTrigger id="hairLoss" className="w-full">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">예</SelectItem>
              <SelectItem value="no">아니오</SelectItem>
              <SelectItem value="irrelevant">상관 없음</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">주관식 추가</label>
          <Textarea placeholder="그 외 원하는 이상형의 조건이 있다면 자유롭게 작성해주세요." value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        </div>


        {userState.isPaid ? (
          <div className="mt-6 p-5 border border-blue-200 rounded-lg bg-blue-50 shadow-sm">
            <h3 className="font-bold text-lg text-blue-800 mb-3">상세 이상형 설정 (가중치)</h3>
            <p className="text-sm text-gray-700 mb-4">각 기준별 중요도를 설정하여 더욱 정교한 매칭을 받아보세요.</p>
            <div className="mb-3">
              <label htmlFor="weightPersonality" className="block text-sm font-medium text-gray-700 mb-2">
                성격 중요도: {weightPersonality[0]}
              </label>
              <Slider id="weightPersonality" value={weightPersonality} onValueChange={setWeightPersonality} min={1} max={10} step={1} />
            </div>
            <div className="mb-3">
              <label htmlFor="weightEconomy" className="block text-sm font-medium text-gray-700 mb-2">
                경제력 중요도: {weightEconomy[0]}
              </label>
              <Slider id="weightEconomy" value={weightEconomy} onValueChange={setWeightEconomy} min={1} max={10} step={1} />
            </div>
            <div className="mb-3">
              <label htmlFor="weightAppearance" className="block text-sm font-medium text-gray-700 mb-2">
                외모 중요도: {weightAppearance[0]}
              </label>
              <Slider id="weightAppearance" value={weightAppearance} onValueChange={setWeightAppearance} min={1} max={10} step={1} />
            </div>
            <Button variant="secondary" className="w-full mt-5" onClick={() => alert('상세 이상형 설정이 저장되었습니다.')}>
              상세 설정 저장
            </Button>
          </div>
        ) : (
          <div className="mt-6 p-5 border border-yellow-200 rounded-lg bg-yellow-50 shadow-sm">
            <h3 className="font-bold text-lg text-yellow-800 mb-3">더욱 정교한 이상형 설정</h3>
            <p className="text-sm text-gray-700 mb-4">각 기준별 가중치 설정 등 상세 이상형 설정은 유료 회원 전용입니다.</p>
            <Button className="w-full" onClick={() => setCurrentScreen('paymentScreen')}>
              유료 회원으로 전환하기
            </Button>
          </div>
        )}

        <Button className="w-full mt-6">이상형 저장</Button>
        <p className="text-center text-sm text-gray-500 mt-4">
          현재 설정에 맞는 가입자: <span className="font-bold text-indigo-600">123명</span>
        </p>
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="myIdealType" />
    </div>
  );
};

// Main Dashboard Screen (for Paid Users)
const MainDashboardScreen = ({ setCurrentScreen }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">해로 대시보드</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('landingScreen')}>
          <LogIn className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">환영합니다, [사용자 이름]님!</h3>
          <p className="text-gray-600">오늘도 당신의 인연을 찾아드리겠습니다.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setCurrentScreen('aiManagerListScreen')}>
          <MessageCircle className="h-8 w-8 text-indigo-600" />
          <div>
            <h4 className="font-bold text-lg text-gray-800">AI 매니저 '해로'</h4>
            <p className="text-sm text-gray-600">새로운 메시지가 도착했습니다.</p>
          </div>
          <ChevronLeft className="h-5 w-5 text-gray-500 rotate-180 ml-auto" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setCurrentScreen('matchingListScreen')}>
          <Heart className="h-8 w-8 text-pink-500" />
          <div>
            <h4 className="font-bold text-lg text-gray-800">오늘의 추천 이성</h4>
            <p className="text-sm text-gray-600">새로운 이성 2명이 추천되었습니다.</p>
          </div>
          <ChevronLeft className="h-5 w-5 text-gray-500 rotate-180 ml-auto" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setCurrentScreen('personalityTestScreen')}>
          <FileText className="h-8 w-8 text-green-600" />
          <div>
            <h4 className="font-bold text-lg text-gray-800">새로운 성향 테스트</h4>
            <p className="text-sm text-gray-600">당신의 가치관을 더 깊이 알아볼까요?</p>
          </div>
          <ChevronLeft className="h-5 w-5 text-gray-500 rotate-180 ml-auto" />
        </div>

        <Button className="w-full mt-6" onClick={() => setCurrentScreen('matchingListScreen')}>
          내 매칭 현황 전체 보기
        </Button>
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="matching" />
    </div>
  );
};

// Utility function to calculate days remaining
const calculateDaysRemaining = (dateString, totalDays) => {
  const targetDate = new Date(dateString);
  const now = new Date();
  // Set time to 00:00:00 for accurate day calculation
  targetDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  // Calculate the expiration date
  const expirationDate = new Date(targetDate);
  expirationDate.setDate(expirationDate.getDate() + totalDays);

  const diffTime = expirationDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use ceil to include current day if any time left
  return diffDays;
};


// Matching List Screen
const MatchingListScreen = ({ setCurrentScreen }) => {
  const { userState } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('recommended'); // Default active tab

  // --- 가상 데이터 (기획에 맞춰 상세화 및 날짜 조정) ---
  const recommendedPartners = [
    // 5일 중 1일 남은 상황 (2025-05-24 기준 -> 5일 후인 5월 29일에 만료)
    { id: 1, name: '김민준', birthYear: 1992, job: '개발자', location: '서울', score: 92, imageUrl: 'https://placehold.co/80x80/FFD1DC/333333?text=김민준', dateRecommended: '2025-05-24', status: 'pendingSelection' },
    // 5일 중 3일 남은 상황 (2025-05-22 기준 -> 5일 후인 5월 27일에 만료)
    { id: 2, name: '박서연', birthYear: 1994, job: '디자이너', location: '경기도', score: 88, imageUrl: 'https://placehold.co/80x80/C0E8D5/333333?text=박서연', dateRecommended: '2025-05-22', status: 'pendingSelection' },
  ];
  const sentRequests = [
    // 3일 중 1일 남은 상황 (2025-05-24 기준 -> 3일 후인 5월 27일에 만료)
    { id: 5, name: '이지훈', birthYear: 1990, job: '사업가', location: '서울', imageUrl: 'https://placehold.co/80x80/FFECB3/333333?text=이지훈', dateSent: '2025-05-24', status: 'waitingResponse' },
    // 3일 중 2일 남은 상황 (2025-05-23 기준 -> 3일 후인 5월 26일에 만료)
    { id: 6, name: '정수아', birthYear: 1996, job: '교사', location: '인천', imageUrl: 'https://placehold.co/80x80/D8BFD8/333333?text=정수아', dateSent: '2025-05-23', status: 'waitingResponse' },
  ];
  const rejectedByPartner = [
    { id: 9, name: '최현우', birthYear: 1991, job: '자유업', location: '대구', imageUrl: 'https://placehold.co/80x80/A2D2FF/333333?text=최현우', dateRejected: '2025-05-25' }, // 사진 블러 처리 안함
  ];
  const receivedRequests = [
    // 3일 중 1일 남은 상황 (2025-05-24 기준 -> 3일 후인 5월 27일에 만료)
    { id: 7, name: '김지은', birthYear: 1997, job: '회사원', location: '부산', imageUrl: 'https://placehold.co/80x80/E0E7FF/6366F1?text=김지은', dateReceived: '2025-05-24', status: 'waitingUserPick' },
    // 3일 중 2일 남은 상황 (2025-05-23 기준 -> 24일, 25일, 26일) -> 3일 후인 5월 26일에 만료
    { id: 14, name: '박준영', birthYear: 1988, job: '공무원', location: '광주', imageUrl: 'https://placehold.co/80x80/D6EAD3/333333?text=박준영', dateReceived: '2025-05-23', status: 'waitingUserPick' },
  ];
  const matchedPartners = [
    { id: 3, name: '이도현', birthYear: 1989, job: '의사', location: '부산', score: 85, imageUrl: 'https://placehold.co/80x80/D8BFD8/333333?text=이도현', dateMatched: '2025-05-20', matchStatus: 'meetingAdjusting', pickedBy: 'me' }, // 미팅일자 조정중, 내가 픽
    { id: 4, name: '최지우', birthYear: 1995, job: '마케터', location: '인천', score: 95, imageUrl: 'https://placehold.co/80x80/FFECB3/333333?text=최지우', dateMatched: '2025-05-22', matchStatus: 'meetingConfirmed', pickedBy: 'partner' }, // 미팅일자 확정, 상대 픽
  ];
  const skippedPartners = [
    { id: 8, name: '하승준', birthYear: 1993, job: '공무원', location: '대전', imageUrl: 'https://placehold.co/80x80/E6E6FA/333333?text=하승준', dateSkipped: '2025-05-18' }, // 사진 블러 처리
  ];
  const completedMeetings = [
    { id: 10, name: '임나영', birthYear: 1990, job: '사업가', location: '제주', imageUrl: 'https://placehold.co/80x80/ADD8E6/333333?text=임나영', dateCompleted: '2025-05-10', feedbackStatus: 'pendingUserFeedback' }, // 후기 작성 안함
    { id: 11, name: '강동원', birthYear: 1985, job: '배우', location: '서울', imageUrl: 'https://placehold.co/80x80/FFB6C1/333333?text=강동원', dateCompleted: '2025-05-08', feedbackStatus: 'waitingPartnerFeedback' }, // 상대방 후기 대기중
    { id: 12, name: '김태리', birthYear: 1990, job: '배우', location: '서울', imageUrl: 'https://placehold.co/80x80/DDA0DD/333333?text=김태리', dateCompleted: '2025-05-05', feedbackStatus: 'nextMeetingScheduled' }, // 후속 미팅 예정
    { id: 13, name: '송강호', birthYear: 1970, job: '배우', location: '경기도', imageUrl: 'https://placehold.co/80x80/C0C0C0/333333?text=송강호', dateCompleted: '2025-05-01', feedbackStatus: 'relationshipEnded' }, // 어긋남
  ];


  const getPartnersForTab = () => {
    switch (activeTab) {
      case 'recommended': return recommendedPartners;
      case 'sentRequests': return sentRequests;
      case 'rejectedByPartner': return rejectedByPartner;
      case 'receivedRequests': return receivedRequests;
      case 'matched': return matchedPartners;
      case 'skipped': return skippedPartners;
      case 'completed': return completedMeetings;
      default: return [];
    }
  };

  const currentPartners = getPartnersForTab();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">매칭 현황</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen(userState.isLoggedIn ? (userState.isPaid ? 'mainDashboardScreen' : 'aiManagerListScreen') : 'landingScreen')}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex space-x-2 text-sm font-semibold text-gray-600 overflow-x-auto pb-2">
          <Button variant={activeTab === 'recommended' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTab('recommended')}>
            추천 받은 이성 ({recommendedPartners.length}명)
          </Button>
          <Button variant={activeTab === 'sentRequests' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap relative" onClick={() => setActiveTab('sentRequests')}>
            보낸 매칭 요청 ({sentRequests.length}건)
          </Button>
          <Button variant={activeTab === 'rejectedByPartner' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTab('rejectedByPartner')}>
            픽했으나 상대가 거절 ({rejectedByPartner.length}건)
          </Button>
          <Button variant={activeTab === 'receivedRequests' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap relative" onClick={() => setActiveTab('receivedRequests')}>
            나를 픽한 이성 ({receivedRequests.length}건)
            {receivedRequests.length > 0 && <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>}
          </Button>
          <Button variant={activeTab === 'matched' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTab('matched')}>
            매칭된 이성 ({matchedPartners.length}명)
          </Button>
          <Button variant={activeTab === 'skipped' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTab('skipped')}>
            스킵한 이성 ({skippedPartners.length}명)
          </Button>
          <Button variant={activeTab === 'completed' ? 'default' : 'secondary'} className="rounded-full whitespace-nowrap" onClick={() => setActiveTab('completed')}>
            미팅 완료 이성 ({completedMeetings.length}명)
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {currentPartners.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            {activeTab === 'recommended' && "아직 해로가 추천해 준 이성이 없습니다. 내 이상형 설정을 더 자세히 해주세요!"}
            {activeTab === 'sentRequests' && "보낸 매칭 요청이 없습니다. 마음에 드는 이성에게 매칭을 신청해 보세요!"}
            {activeTab === 'rejectedByPartner' && "상대방으로부터 거절된 픽이 없습니다."}
            {activeTab === 'receivedRequests' && "아직 받은 매칭 요청이 없습니다. AI 매니저와 상담하여 프로필을 더 매력적으로 가꿔보세요!"}
            {activeTab === 'matched' && "매칭된 이성이 없습니다. 용기를 내어 매칭 요청을 보내보세요!"}
            {activeTab === 'skipped' && "스킵한 이성이 없습니다."}
            {activeTab === 'completed' && "미팅 완료 이성이 없습니다."}
          </div>
        ) : (
          currentPartners.map((partner) => {
            // calculateDaysRemaining 함수는 '만료일'을 기준으로 남은 일수를 계산합니다.
            // 예: 5일 내 선택 필수 -> 오늘이 5월 25일, 추천일이 5월 24일이면 5/24 + 5일 = 5/29 만료. 5/29 - 5/25 = 4일 남음.
            const daysRemainingRecommend = partner.dateRecommended ? calculateDaysRemaining(partner.dateRecommended, 5) : null;
            const daysRemainingSent = partner.dateSent ? calculateDaysRemaining(partner.dateSent, 3) : null;
            const daysRemainingReceived = partner.dateReceived ? calculateDaysRemaining(partner.dateReceived, 3) : null;

            return (
              <div key={partner.id} className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center space-x-4">
                <div className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${activeTab === 'skipped' ? 'filter blur-sm' : ''}`}>
                  <img src={partner.imageUrl} alt={partner.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-800">
                    {partner.name}, {new Date().getFullYear() - partner.birthYear + 1}세
                  </h3>
                  <p className="text-sm text-gray-600">
                    {partner.job}, {partner.location} 거주
                  </p>
                  {/* 날짜 및 시간 기반 알림 */}
                  {activeTab === 'recommended' && partner.dateRecommended && (
                    <p className="text-xs text-gray-500 mt-1">
                      추천받은 일자: {partner.dateRecommended} | <span className={`${daysRemainingRecommend <= 1 ? 'text-red-500 font-bold' : 'text-blue-600'}`}>{daysRemainingRecommend}일 내 선택 필수</span>
                    </p>
                  )}
                  {activeTab === 'sentRequests' && partner.dateSent && (
                    <p className="text-xs text-gray-500 mt-1">
                      픽 보낸 일자: {partner.dateSent} | <span className={`${daysRemainingSent <= 1 ? 'text-red-500 font-bold' : 'text-blue-600'}`}>{daysRemainingSent}일 내 선택 받지 못하면 거절</span>
                    </p>
                  )}
                  {activeTab === 'rejectedByPartner' && partner.dateRejected && (
                    <p className="text-xs text-gray-500 mt-1">
                      거절된 일자: {partner.dateRejected}
                    </p>
                  )}
                  {activeTab === 'receivedRequests' && partner.dateReceived && (
                    <p className="text-xs text-gray-500 mt-1">
                      픽 받은 일자: {partner.dateReceived} | <span className={`${daysRemainingReceived <= 1 ? 'text-red-500 font-bold' : 'text-blue-600'}`}>{daysRemainingReceived}일 내 결정 필수</span>
                    </p>
                  )}
                  {activeTab === 'matched' && partner.dateMatched && (
                    <p className="text-xs text-gray-500 mt-1">
                      매칭된 일자: {partner.dateMatched}
                      {partner.pickedBy && (
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${partner.pickedBy === 'me' ? 'bg-indigo-100 text-indigo-700' : 'bg-pink-100 text-pink-700'}`}>
                          {partner.pickedBy === 'me' ? '내가 픽' : '상대방 픽'}
                        </span>
                      )}
                    </p>
                  )}
                  {activeTab === 'skipped' && partner.dateSkipped && (
                    <p className="text-xs text-gray-500 mt-1">
                      스킵한 일자: {partner.dateSkipped}
                    </p>
                  )}
                  {activeTab === 'completed' && partner.dateCompleted && (
                    <p className="text-xs text-gray-500 mt-1">
                      미팅 완료일자: {partner.dateCompleted}
                    </p>
                  )}

                  {/* 매칭 스코어 */}
                  {partner.score && <p className="text-sm text-indigo-600 font-semibold mt-1">AI 매칭 스코어: {partner.score}%</p>}

                  {/* 매칭된 이성 상세 상태 */}
                  {activeTab === 'matched' && partner.matchStatus === 'meetingAdjusting' && (
                    <p className="text-sm text-yellow-700 mt-1 font-medium">미팅 일자 조정 중</p>
                  )}
                  {activeTab === 'matched' && partner.matchStatus === 'meetingConfirmed' && (
                    <p className="text-sm text-green-700 mt-1 font-medium">미팅 일자 확정 (대기 중)</p>
                  )}

                  {/* 미팅 완료 이성 상세 상태 */}
                  {activeTab === 'completed' && partner.feedbackStatus === 'pendingUserFeedback' && (
                    <p className="text-sm text-red-700 mt-1 font-medium">후기 작성 필요</p>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'waitingPartnerFeedback' && (
                    <p className="text-sm text-gray-700 mt-1 font-medium">상대방 후기 대기 중</p>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'nextMeetingScheduled' && (
                    <p className="text-sm text-blue-700 mt-1 font-medium">후속 미팅 예정</p>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'relationshipEnded' && (
                    <p className="text-sm text-gray-500 mt-1 font-medium">아쉽게 어긋났습니다</p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  {/* 탭별 액션 버튼 */}
                  {activeTab === 'recommended' && (
                    <>
                      <Button size="sm" onClick={() => setCurrentScreen('partnerDetailScreen')}>
                        자세히 보기
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert(`${partner.name}님에게 매칭 요청합니다.`)}>
                        매칭 요청
                      </Button>
                    </>
                  )}
                  {activeTab === 'sentRequests' && (
                    <>
                      <Button size="sm" onClick={() => alert(`${partner.name}님과의 매칭 요청 상세 보기`)}>
                        상태 확인
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert(`${partner.name}님과의 요청을 취소합니다.`)}>
                        요청 취소
                      </Button>
                    </>
                  )}
                  {activeTab === 'rejectedByPartner' && (
                    <Button size="sm" variant="outline" onClick={() => alert(`${partner.name}님 프로필 다시 보기 (유료)`)}>
                      다시 보기
                    </Button>
                  )}
                  {activeTab === 'receivedRequests' && (
                    <>
                      <Button size="sm" onClick={() => setCurrentScreen('partnerDetailScreen')}>
                        프로필 확인
                      </Button>
                      <Button size="sm" onClick={() => setCurrentScreen('matchSuccessScreen')}>
                        수락
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert(`${partner.name}님의 요청을 거절합니다.`)}>
                        거절
                      </Button>
                    </>
                  )}
                  {activeTab === 'matched' && partner.matchStatus === 'meetingAdjusting' && (
                    <Button size="sm" onClick={() => setCurrentScreen('aiManagerListScreen')}> {/* AI와 조율 버튼은 AI 매니저 목록으로 이동 */}
                      AI와 조율
                    </Button>
                  )}
                  {activeTab === 'matched' && partner.matchStatus === 'meetingConfirmed' && (
                    <>
                      <Button size="sm" onClick={() => setCurrentScreen('aiManagerListScreen')}> {/* AI와 대화 버튼은 AI 매니저 목록으로 이동 */}
                        AI와 대화
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => alert(`${partner.name}님과 연락처 교환`)}>
                        연락처 보기
                      </Button>
                    </>
                  )}
                  {activeTab === 'skipped' && (
                    <Button size="sm" variant="outline" onClick={() => alert(`${partner.name}님에게 다시 매칭 요청 (유료)`)}>
                      다시 요청
                    </Button>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'pendingUserFeedback' && (
                    <Button size="sm" onClick={() => setCurrentScreen('feedbackScreen')}>
                      후기 작성
                    </Button>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'waitingPartnerFeedback' && (
                    <Button size="sm" variant="outline" onClick={() => alert('상대방 후기 대기 중입니다.')}>
                      후기 확인
                    </Button>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'nextMeetingScheduled' && (
                    <Button size="sm" onClick={() => setCurrentScreen('aiManagerListScreen')}> {/* AI와 일정 버튼은 AI 매니저 목록으로 이동 */}
                      AI와 일정
                    </Button>
                  )}
                  {activeTab === 'completed' && partner.feedbackStatus === 'relationshipEnded' && (
                    <Button size="sm" variant="outline" onClick={() => alert('지난 매칭 상세 기록 보기')}>
                      기록 보기
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="matching" />
    </div>
  );
};

// Placeholder components (need full implementation if used)
const PartnerDetailScreen = ({ setCurrentScreen }) => {
  const { userState } = useContext(UserContext);
  // Example partner data (in a real app, this would come from state/API)
  const partner = {
    name: '김민준',
    age: 32,
    job: '개발자',
    location: '서울',
    score: 92,
    imageUrl: 'https://placehold.co/128x128/FFD1DC/333333?text=김민준',
    bio: '안녕하세요! 저는 새로운 기술과 도전을 좋아하는 개발자입니다. 주말에는 주로 캠핑이나 등산 등 야외 활동을 즐깁니다. 따뜻하고 긍정적인 분과 함께 미래를 그려나가고 싶습니다.',
    details: [
      { label: '학력', value: '연세대학교 컴퓨터공학과' },
      { label: '연봉', value: '8천만원 이상' },
      { label: '자산', value: '아파트 소유' },
      { label: '취미', value: '캠핑, 등산, 독서' },
      { label: '성격', value: '활발하고 유머러스함' },
    ],
    aiComment: '김민준님은 사용자님과 비슷한 가치관을 가지고 있으며, 특히 활동적인 취미를 공유할 가능성이 높습니다. 서로에게 긍정적인 영향을 줄 수 있는 분입니다.',
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">이성 상세 프로필</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('matchingListScreen')}>
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden shadow-md mb-3">
            <img src={partner.imageUrl} alt={`${partner.name} 프로필`} className="object-cover w-full h-full" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {partner.name}, {partner.age}세
          </h3>
          <p className="text-gray-600">
            {partner.job}, {partner.location} 거주
          </p>
          <p className="text-indigo-600 font-semibold text-lg mt-2">AI 매칭 스코어: {partner.score}%</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h4 className="font-bold text-lg text-gray-800 mb-3">자기소개</h4>
          <p className="text-gray-700">{partner.bio}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h4 className="font-bold text-lg text-gray-800 mb-3">주요 정보</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {partner.details.map((detail, index) => (
              <li key={index}>
                <span className="font-medium">{detail.label}:</span> {detail.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <h4 className="font-bold text-lg text-gray-800 mb-3">AI 매니저 코멘트</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{partner.aiComment}</p>
        </div>

        <div className="flex space-x-4 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => alert(`${partner.name}님에게 관심 없음을 표시했습니다.`)}>
            관심 없음
          </Button>
          <Button className="flex-1" onClick={() => setCurrentScreen('matchRequestSentScreen')}>
            매칭 요청하기
          </Button>
        </div>
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="matching" />
    </div>
  );
};

// Match Request Sent Screen
const MatchRequestSentScreen = ({ setCurrentScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50">
      <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-md">
        <MessageCircle className="h-20 w-20 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">매칭 요청이 성공적으로 전송되었습니다!</h3>
      <p className="text-lg text-gray-600 mb-8">상대방의 수락을 기다리고 있습니다. 상대방이 수락하면 바로 알려드릴게요.</p>
      <Button className="w-full max-w-xs" onClick={() => setCurrentScreen('matchingListScreen')}>
        내 매칭 현황 보기
      </Button>
    </div>
  );
};

// Match Success Screen
const MatchSuccessScreen = ({ setCurrentScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50">
      <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6 shadow-md">
        <Award className="h-20 w-20 text-pink-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">축하합니다! 매칭이 성공적으로 이루어졌습니다!</h3>
      <p className="text-lg text-gray-600 mb-8">AI 매니저와 대화하여 미팅 일정을 조율해 보세요.</p>
      <Button className="w-full max-w-xs" onClick={() => setCurrentScreen('aiManagerListScreen')}> {/* AI 매니저 목록으로 이동 */}
        AI 매니저와 대화하기
      </Button>
      <p className="text-sm text-gray-500 mt-4">상대방 연락처는 미팅 1일 전 AI 매니저가 전달해 드립니다.</p>
    </div>
  );
};

// Feedback Screen
const FeedbackScreen = ({ setCurrentScreen }) => {
  const { userState } = useContext(UserContext);
  const [rating, setRating] = useState('');
  const [goodPoints, setGoodPoints] = useState('');
  const [badPoints, setBadPoints] = useState('');

  const handleSubmitFeedback = () => {
    alert('피드백이 성공적으로 제출되었습니다. 감사합니다!');
    setCurrentScreen('matchingListScreen');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="header">
        <h2 className="text-xl font-bold">매칭 후 피드백</h2>
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('matchingListScreen')}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">오늘의 만남은 어떠셨나요?</h3>
          <p className="text-gray-600">솔직한 피드백은 더 나은 매칭을 만드는 데 큰 도움이 됩니다.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="feedbackRating" className="block text-sm font-medium text-gray-700 mb-2">
            전반적인 만족도
          </label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">매우 만족</SelectItem>
              <SelectItem value="4">만족</SelectItem>
              <SelectItem value="3">보통</SelectItem>
              <SelectItem value="2">불만족</SelectItem>
              <SelectItem value="1">매우 불만족</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="feedbackGood" className="block text-sm font-medium text-gray-700 mb-2">
            상대방의 어떤 점이 좋았나요?
          </label>
          <Textarea id="feedbackGood" placeholder="자유롭게 작성해주세요." value={goodPoints} onChange={(e) => setGoodPoints(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="feedbackBad" className="block text-sm font-medium text-gray-700 mb-2">
            다음 매칭 시 고려할 점이 있나요?
          </label>
          <Textarea id="feedbackBad" placeholder="예: 외모, 성격, 직업 등" value={badPoints} onChange={(e) => setBadPoints(e.target.value)} />
        </div>

        <Button className="w-full" onClick={handleSubmitFeedback}>
          피드백 제출
        </Button>
      </div>
      <FooterNav setCurrentScreen={setCurrentScreen} activeTab="matching" />
    </div>
  );
};

// Payment Screen
const PaymentScreen = ({ setCurrentScreen }) => {
  const { upgradeToPaid } = useContext(UserContext);

  const handlePayment = () => {
    upgradeToPaid();
    alert('결제가 완료되었습니다! 이제 모든 기능을 이용하실 수 있습니다.');
    setCurrentScreen('mainDashboardScreen');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <DollarSign className="h-24 w-24 mb-6 text-white animate-bounce-in" />
      <h3 className="text-3xl font-bold mb-4 animate-fade-in-down">AI 매칭 에이전트 '해로' 프리미엄</h3>
      <p className="text-2xl font-extrabold text-white mb-8 animate-fade-in-up">1년 구독: 150만원</p>
      <p className="text-lg text-indigo-100 mb-10 animate-fade-in-up">
        무제한 매칭, 상세 이상형 설정, 사주/타로 상담 등 모든 기능을 이용해 보세요!
      </p>

      {/* 텍스트 색상 문제를 해결하기 위해 text-gray-900을 명시적으로 사용합니다. */}
      <Button className="w-full max-w-xs bg-white text-gray-900 hover:bg-gray-100 shadow-lg animate-scale-in" onClick={handlePayment}>
        결제하고 유료 전환
      </Button>
      <p className="text-sm text-indigo-200 mt-6">결제 시 약관에 동의하는 것으로 간주됩니다.</p>
      <Button variant="ghost" className="mt-4 text-indigo-200 hover:text-white" onClick={() => setCurrentScreen('aiManagerListScreen')}>
        <ChevronLeft className="h-4 w-4 mr-1" /> 취소하고 돌아가기
      </Button>
    </div>
  );
};

// Footer Navigation Component
const FooterNav = ({ setCurrentScreen, activeTab }) => {
  return (
    <div className="flex justify-around p-3 border-t border-gray-200 bg-white rounded-b-xl shadow-inner">
      <div className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setCurrentScreen('aiManagerListScreen')}>
        <MessageCircle className="h-6 w-6" />
        <span>AI 매니저</span>
      </div>
      <div className={`nav-item ${activeTab === 'matching' ? 'active' : ''}`} onClick={() => setCurrentScreen('matchingListScreen')}>
        <Heart className="h-6 w-6" />
        <span>매칭</span>
      </div>
      <div className={`nav-item ${activeTab === 'myIdealType' ? 'active' : ''}`} onClick={() => setCurrentScreen('myIdealTypeScreen')}>
        <Star className="h-6 w-6" /> {/* Changed icon to Star for Ideal Type */}
        <span>나의 이상형</span>
      </div>
      <div className={`nav-item ${activeTab === 'personalityTest' ? 'active' : ''}`} onClick={() => setCurrentScreen('personalityTestScreen')}>
        <FileText className="h-6 w-6" />
        <span>성향 테스트</span>
      </div>
      <div className={`nav-item ${activeTab === 'my' ? 'active' : ''}`} onClick={() => setCurrentScreen('myProfileScreen')}>
        <User className="h-6 w-6" />
        <span>MY</span>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landingScreen');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedAIManagerPersona, setSelectedAIManagerPersona] = useState('friendly'); // Default AI manager

  const login = () => setIsLoggedIn(true);
  const signup = () => setIsLoggedIn(true);
  const upgradeToPaid = () => setIsPaid(true);

  // Example dummy user data (will be replaced by CMS)
  const [userData, setUserData] = useState({
    userName: '사용자', // 기본 사용자 이름 설정
    userProfile: {
      age: 30,
      job: 'AI 매니저',
      bio: '안녕하세요! 저는 AI 매칭 에이전트 해로입니다. 당신의 완벽한 인연을 찾아드리겠습니다.',
    },
    idealType: {
      ageRange: [28, 35],
      heightRange: [170, 180],
      personality: '밝고 긍정적인 성격',
      job: '전문직, IT 개발자',
      familyComposition: '',
      preferredRegion: '',
      preferredHobby: '',
      educationLevel: '',
      assetRange: '',
      salaryRange: '',
      appearancePreference: '',
      celebrityIdealType: '',
      hairLossStatus: '',
      additionalNotes: '',
    },
    personalityTestResults: [], // Dummy for now
  });

  // Dynamically render screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landingScreen':
        return <LandingScreen setCurrentScreen={setCurrentScreen} />;
      case 'signupScreen':
        return <SignupScreen setCurrentScreen={setCurrentScreen} />;
      case 'loginScreen':
        return <LoginScreen setCurrentScreen={setCurrentScreen} />;
      case 'personalityTestGuestScreen':
        return <PersonalityTestGuestScreen setCurrentScreen={setCurrentScreen} />;
      case 'aiManagerListScreen': // 새로운 AI 매니저 목록 화면
        return <AIManagerListScreen setCurrentScreen={setCurrentScreen} />;
      case 'chatScreen':
        return <ChatScreen
          setCurrentScreen={setCurrentScreen}
          selectedAIManagerPersona={selectedAIManagerPersona}
          setSelectedAIManagerPersona={setSelectedAIManagerPersona}
        />;
      case 'myProfileScreen':
        return <MyProfileScreen setCurrentScreen={setCurrentScreen} />;
      case 'myIdealTypeScreen':
        return <MyIdealTypeScreen setCurrentScreen={setCurrentScreen} />;
      case 'mainDashboardScreen':
        return <MainDashboardScreen setCurrentScreen={setCurrentScreen} />;
      case 'matchingListScreen':
        return <MatchingListScreen setCurrentScreen={setCurrentScreen} />;
      case 'partnerDetailScreen':
        return <PartnerDetailScreen setCurrentScreen={setCurrentScreen} />;
      case 'matchRequestSentScreen':
        return <MatchRequestSentScreen setCurrentScreen={setCurrentScreen} />;
      case 'matchSuccessScreen':
        return <MatchSuccessScreen setCurrentScreen={setCurrentScreen} />;
      case 'feedbackScreen':
        return <FeedbackScreen setCurrentScreen={setCurrentScreen} />;
      case 'personalityTestScreen':
        return <PersonalityTestScreen setCurrentScreen={setCurrentScreen} />;
      case 'paymentScreen':
        return <PaymentScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <LandingScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <UserContext.Provider value={{ userState: { isLoggedIn, isPaid, userName: userData.userName }, login, signup, upgradeToPaid, userData, setUserData, selectedAIManagerPersona, setSelectedAIManagerPersona }}>
      <div className="container">
        {renderScreen()}
      </div>
    </UserContext.Provider>
  );
}
