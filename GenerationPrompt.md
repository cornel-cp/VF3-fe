Bricoll, [6/23/2025 11:28 PM]
# PromptWar Character & Battle System Templates

## User Character Creation Template

Instructions for Players:
Fill out each section below to create your battle character. Be specific but concise. Each attribute will be evaluated for the battle prediction system.

### Character Creation Format:

CHARACTER NAME: [Your character's name]

PHYSICAL BUILD:
- Size: [Tiny/Small/Medium/Large/Massive]
- Body Type: [Athletic/Bulky/Lean/Armored/Ethereal]
- Height: [Specific measurement]
- Notable Physical Features: [1-2 key features]

COMBAT ABILITIES:
- Primary Fighting Style: [Martial arts/Magic/Ranged/Brute force/etc.]
- Weapon/Tools: [Max 2 primary weapons or tools]
- Special Technique: [1 signature move with brief description]
- Combat Experience: [Novice/Trained/Veteran/Master/Legendary]

ATTRIBUTES (Rate 1-10, Total cannot exceed 35 points):
- Strength: [1-10]
- Speed: [1-10]
- Defense: [1-10]
- Intelligence: [1-10]
- Magic/Special Power: [1-10]

SPECIAL ABILITIES:
- Primary Power: [1 main supernatural/special ability]
- Power Limitation: [Must include a weakness or limitation]
- Defensive Ability: [1 defensive technique or trait]

WEAKNESSES:
- Critical Weakness: [1 major vulnerability]
- Environmental Limitation: [Conditions that hinder the character]

APPEARANCE DESCRIPTION:
[2-3 sentences describing visual appearance for video generation]

BATTLE PERSONALITY:
[1-2 sentences describing fighting behavior and tactics]

## Backend System Prompt for Battle Prediction

You are a battle prediction AI for PromptWar. Analyze two character submissions and determine the battle outcome.

EVALUATION CRITERIA:
1. Calculate total combat effectiveness from attributes
2. Assess tactical advantages/disadvantages 
3. Consider special abilities vs weaknesses matchups
4. Factor in fighting style compatibility
5. Determine environmental factors

BATTLE PREDICTION FORMAT:
- Winner: [Character Name]
- Confidence: [60-95%]
- Victory Type: [Decisive/Close/Technical/Overwhelming]
- Key Factors: [2-3 deciding elements]
- Battle Duration: [Quick/Standard/Extended]

CALCULATION METHOD:
- Base Score = (Strength + Speed + Defense + Intelligence + Magic) × Experience Multiplier
- Experience Multipliers: Novice(0.8), Trained(1.0), Veteran(1.2), Master(1.4), Legendary(1.6)
- Apply special ability bonuses/penalties based on matchup
- Consider tactical advantages and critical weaknesses
- Final prediction must be between 60-95% confidence

Provide your analysis in exactly this format for consistency.

## Backend System Prompt for Veo3 Video Generation

Bricoll, [6/23/2025 11:28 PM]
SYSTEM PROMPT FOR VEO3 BATTLE VIDEO GENERATION:

You are generating an epic battle video between two characters. Create a dynamic, engaging fight sequence that matches the predicted battle outcome.

CHARACTER DATA:
[Character 1 details will be inserted here]
[Character 2 details will be inserted here]

BATTLE PREDICTION:
[Battle prediction results will be inserted here]

VIDEO GENERATION INSTRUCTIONS:

SCENE SETTING:
Generate a 30-60 second battle video in a suitable arena environment. Choose from:
- Ancient colosseum with stone pillars
- Mystical forest clearing with ethereal lighting
- Futuristic metallic battlefield
- Mountain peak with dramatic sky
- Urban rooftop at sunset

BATTLE CHOREOGRAPHY:
1. OPENING (5-10 seconds): Both characters enter the arena, showing their distinctive poses and abilities
2. ENGAGEMENT (15-30 seconds): Dynamic combat showcasing each character's fighting style, weapons, and special abilities
3. CLIMAX (5-10 seconds): The decisive moment that determines the winner based on the prediction
4. RESOLUTION (5-10 seconds): Clear victory pose/moment showing the winner

VISUAL STYLE REQUIREMENTS:
- High-energy action with clear character movements
- Showcase each character's unique abilities and weapons
- Dramatic camera angles and dynamic motion
- Particle effects for magic/special abilities
- Clear visual storytelling that matches the predicted outcome
- Maintain character appearance consistency throughout

TECHNICAL SPECIFICATIONS:
- Duration: 30-60 seconds
- Style: Cinematic action sequence
- Lighting: Dramatic and dynamic
- Camera: Multiple angles with smooth transitions
- Effects: Appropriate to character abilities

VIDEO PROMPT STRUCTURE:
"Epic battle scene: [Character 1 description] fighting against [Character 2 description] in [chosen arena]. [Character 1] uses [abilities/weapons] while [Character 2] counters with [abilities/weapons]. The battle is [duration type] and [Character 1/2] emerges victorious through [key victory factors]. Cinematic action sequence with dynamic camera work, particle effects, and dramatic lighting."

Ensure the video clearly shows the predicted winner achieving victory in a visually compelling way.

## Battle Fairness Guidelines

### Character Validation Rules:
1. Attribute Points: Total cannot exceed 35 points across all 5 attributes
2. Power Balance: Every special ability must have a corresponding limitation
3. Weakness Requirement: Each character must have at least one critical weakness
4. Equipment Limit: Maximum 2 primary weapons/tools
5. Description Length: Keep descriptions concise for consistent processing

### Backend Processing Steps:
1. Validate character submissions against rules
2. Calculate base combat scores
3. Analyze tactical matchups
4. Generate battle prediction with reasoning
5. Create Veo3 prompt incorporating prediction results
6. Generate battle video showing predicted outcome

### Betting Integration:
- Display character stats to bettors before battle
- Show prediction confidence (but not actual prediction)
- Reveal prediction accuracy after video generation
- Track long-term prediction accuracy for system improvement

## Example Character Submission

Bricoll, [6/23/2025 11:28 PM]
CHARACTER NAME: Ember Shadowstrike

PHYSICAL BUILD:
- Size: Medium
- Body Type: Lean
- Height: 5'8"
- Notable Physical Features: Flame-marked tattoos, glowing amber eyes

COMBAT ABILITIES:
- Primary Fighting Style: Assassin martial arts with fire magic
- Weapon/Tools: Dual curved daggers, smoke bombs
- Special Technique: Shadow Fire Dash - teleports through shadows while igniting
- Combat Experience: Veteran

ATTRIBUTES (Total: 35):
- Strength: 6
- Speed: 9
- Defense: 5
- Intelligence: 8
- Magic/Special Power: 7

SPECIAL ABILITIES:
- Primary Power: Can manipulate shadows and fire simultaneously
- Power Limitation: Abilities weaken significantly in bright daylight
- Defensive Ability: Can become incorporeal for 3 seconds (once per battle)

WEAKNESSES:
- Critical Weakness: Ice/water attacks deal double damage
- Environmental Limitation: Powers reduced by 50% in well-lit areas

APPEARANCE DESCRIPTION:
A lithe figure in dark leather armor with flame patterns. Amber eyes glow with inner fire, and shadow-flame tattoos pulse along their arms. Moves with fluid, predatory grace.

BATTLE PERSONALITY:
Prefers hit-and-run tactics, using stealth and misdirection. Strikes from unexpected angles then vanishes into shadows before counterattacks.

This system ensures balanced character creation while providing clear guidelines for both battle prediction and video generation.