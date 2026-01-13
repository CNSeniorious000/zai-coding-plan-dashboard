<div align="center">

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

  <p>

  # Z.AI Usage 대시보드

  실시간 분석과 다국어 지원이 포함된 Z.AI API 사용 현황을 모니터링하는 현대적인 Next.js 대시보드.

</div>

## 기능

- **📈 실시간 사용 현황 추적** - 모델 호출, 토큰 사용량, 도구 성능 모니터링
- **📊 시각화 분석** - 사용 추세를 보여주는 아름다운 차트
- **🔒 보안** - API 키는 브라우저의 localStorage에만 저장
- **🌙 다크 모드** - Material You 디자인, 자동 테마 전환
- **🌍 다국어 지원** - 7개 언어 지원
- **📱 반응형** - 데스크톱, 태블릿, 모바일에 완벽하게 대응
- **⚡ 고성능** - Next.js 16과 React 19로 최적화된 성능

## 기술 스택

| 기술 | 설명 |
|-----|------|
| **Next.js 16** | App Router가 포함된 React 프레임워크 |
| **React 19** | Server Components를 지원하는 최신 React |
| **TypeScript** | 타입 안전 개발 |
| **Tailwind CSS v4** | 유틸리티 우선 CSS 프레임워크 |
| **next-intl** | 국제화 (i18n) 프레임워크 |
| **Recharts** | 데이터 시각화 라이브러리 |
| **Radix UI** | 접근 가능한 컴포넌트 라이브러리 |
| **Fumadocs** | 문서 시스템 |

## 설치

```bash
# 저장소 복제
git clone https://github.com/CNSeniorious000/zai-coding-plan-dashboard.git

# 프로젝트 디렉토리로 이동
cd zai-coding-plan-dashboard

# 의존성 설치
npm install
# 또는
yarn install
# 또는
pnpm install

# 개발 서버 시작
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열으세요.

## 사용 방법

1. **API 키 가져오기**
   - [Z.AI 플랫폼](https://z.ai/manage-apikey/apikey-list) 방문
   - API 키 생성 또는 복사
   - 형식：`32hexchars.16alphanumchars`

2. **API 키 입력**
   - 대시보드에 API 키 붙여넣기
   - "가져오기" 클릭하여 사용 데이터 로드

3. **통계 보기**
   - 프로그레스 바가 있는 할당량 개요
   - 모델별 토큰 사용 현황
   - 성공/실패율이 포함된 도구 사용 현황
   - 추세의 시각화 차트

## API 엔드포인트

대시보드는 Z.AI의 공식 모니터링 API 사용：

| 엔드포인트 | 설명 |
|----------|------|
| `/api/monitor/usage/model-usage` | 모델 토큰 사용 통계 |
| `/api/monitor/usage/tool-usage` | 도구 호출 성능 |
| `/api/monitor/usage/quota/limit` | 현재 할당량 제한 |

## 프로젝트 구조

```
src/
├── app/
│   ├── [locale]/          # 현지화된 경로 (en, zh-CN, ja, ko, es, fr, de)
│   │   ├── page.tsx       # 메인 대시보드 페이지
│   │   └── docs/          # 문서 페이지
│   └── api/
│       └── usage/          # 백엔드 API 프록시
├── components/
│   ├── Dashboard.tsx      # 메인 대시보드 컴포넌트
│   ├── UsageCharts.tsx    # 데이터 시각화
│   └── ui/              # 재사용 가능 UI 컴포넌트
├── i18n/                  # 국제화 구성
├── lib/                   # 유틸리티
└── messages/               # 번역 파일
```

## 지원 언어

- 🇺🇸 [English](README.md)
- 🇨🇳 [简体中文](README.zh-CN.md)
- 🇯🇵 [日本語](README.ja.md)
- 🇰🇷 [한국어](README.ko.md)
- 🇪🇸 [Español](README.es.md)
- 🇫🇷 [Français](README.fr.md)
- 🇩🇪 [Deutsch](README.de.md)

## 문서

전체 문서는 애플리케이션의 `/docs` 경로에서 볼 수 있습니다.

## 보안

- **API 키 저장**：API 키는 브라우저의 `localStorage`에만 저장됩니다
- **서버 저장 없음**：애플리케이션은 Z.AI 공식 API 이외의 서버에 키를 저장하거나 전송하지 않습니다
- **클라이언트 전용**：모든 데이터 가져오기는 브라우저에서 Z.AI로 직접 수행됩니다

## 기여

기여를 환영합니다! Pull Request를 자유롭게 제출하세요.

## 라이선스

이 프로젝트는 프라이빗 프로젝트입니다.

---

<div align="center">

  Z.AI 커뮤니티를 위해 ❤️로 만들어졌습니다

  **[English](README.md)** | **[简体中文](README.zh-CN.md)** | **[日本語](README.ja.md)** | **[한국어](README.ko.md)** | **[Español](README.es.md)** | **[Français](README.fr.md)** | **[Deutsch](README.de.md)**

</div>
