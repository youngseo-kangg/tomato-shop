---
description: 변경을 검증(pnpm test + pnpm build)하고 관심사 단위로 커밋한다. 검증 실패 시 커밋하지 않는다. 수동(/commit)으로만 실행.
argument-hint: "[선택: 커밋 메시지 힌트]"
disable-model-invocation: true
allowed-tools: Bash(pnpm test:*), Bash(pnpm build:*), Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git log:*)
---

# /commit — 검증 후 관심사별 커밋

아래 순서를 지킨다. **검증을 통과하지 못하면 절대 커밋하지 않는다.**

## 1. 검증 (실패 시 즉시 중단)

1. `pnpm test` 실행. 실패하면 멈추고 실패 요약을 보고. **커밋 금지.**
2. `pnpm build` 실행. 실패하면 멈추고 원인을 보고. **커밋 금지.**

## 2. 변경 파악

- `git status`와 `git diff`(+ staged)로 변경을 확인한다.
- 변경이 없으면 "커밋할 변경 없음"을 알리고 종료.

## 3. 관심사별 커밋

- 변경을 **관심사 단위로 그룹핑**한다. 서로 다른 관심사가 섞였으면 **여러 커밋으로 나눈다**.
- 각 그룹마다 `git add <paths>`로 해당 파일만 스테이징 후 커밋.
- 메시지 스타일(이 레포 관례): `<타입>: <한국어 설명>`
  - 타입: `feature` / `fix` / `refactor` / `test` / `docs` / `chore` / `init`
  - 예: `docs: .claude rules(architecture/testing/code-style) 추가`
- 첫 줄 70자 이내, 명령형. `$ARGUMENTS`가 있으면 메시지 힌트로 활용.
- 각 커밋 메시지 끝에 트레일러 추가:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

## 4. 마무리

- **push 하지 않는다** (사용자가 요청할 때만).
- 생성한 커밋을 `git log --oneline`으로 요약 보고.
