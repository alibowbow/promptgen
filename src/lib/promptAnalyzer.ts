// Prompt analysis and quality evaluation utilities
export interface PromptAnalysis {
  clarity: number;
  specificity: number;
  length: number;
  structure: number;
  creativity: number;
  overall: number;
}

export class PromptAnalyzer {
  
  // Analyze prompt quality
  static analyzeQuality(text: string): PromptAnalysis | null {
    if (!text || typeof text !== 'string') {
      return null;
    }

    const analysis = {
      clarity: this.calculateClarity(text),
      specificity: this.calculateSpecificity(text),
      length: this.calculateLengthScore(text),
      structure: this.calculateStructure(text),
      creativity: this.calculateCreativity(text),
      overall: 0
    };

    // Calculate overall score (weighted average)
    analysis.overall = Math.round(
      (analysis.clarity * 0.25 + 
       analysis.specificity * 0.25 + 
       analysis.length * 0.15 + 
       analysis.structure * 0.20 + 
       analysis.creativity * 0.15) * 100
    ) / 100;

    return analysis;
  }

  // Calculate clarity score (0-5)
  static calculateClarity(text: string): number {
    let score = 3.0; // base score
    
    // Penalize overly complex sentences
    const avgSentenceLength = text.split(/[.!?]+/).reduce((acc, sentence) => {
      return acc + sentence.trim().split(/\s+/).length;
    }, 0) / text.split(/[.!?]+/).length;
    
    if (avgSentenceLength > 25) score -= 1.0;
    else if (avgSentenceLength > 15) score -= 0.5;
    
    // Reward clear instructions
    const instructionWords = ['create', 'generate', 'make', 'design', 'show', 'display', 'write'];
    const hasInstructions = instructionWords.some(word => 
      text.toLowerCase().includes(word)
    );
    if (hasInstructions) score += 1.0;
    
    // Penalize ambiguous words
    const ambiguousWords = ['something', 'anything', 'maybe', 'perhaps', 'kind of'];
    const ambiguousCount = ambiguousWords.reduce((count, word) => 
      count + (text.toLowerCase().split(word).length - 1), 0
    );
    score -= ambiguousCount * 0.5;
    
    return Math.max(1, Math.min(5, score));
  }

  // Calculate specificity score (0-5)
  static calculateSpecificity(text: string): number {
    let score = 2.0; // base score
    
    // Count descriptive adjectives and specific terms
    const descriptiveWords = text.match(/\b(detailed|specific|precise|exact|vivid|realistic|colorful|bright|dark|modern|vintage|professional|creative|elegant|simple|complex)\b/gi);
    if (descriptiveWords) {
      score += Math.min(2.0, descriptiveWords.length * 0.3);
    }
    
    // Count numbers and measurements
    const numbersCount = (text.match(/\b\d+(?:\.\d+)?\s*(?:px|cm|inch|%|degree|second|minute)\b/gi) || []).length;
    score += Math.min(1.0, numbersCount * 0.5);
    
    // Reward specific categories/styles
    const specificTerms = ['4k', 'hd', 'portrait', 'landscape', 'close-up', 'wide-angle', 'macro'];
    const specificCount = specificTerms.reduce((count, term) => 
      count + (text.toLowerCase().includes(term) ? 1 : 0), 0
    );
    score += Math.min(1.0, specificCount * 0.3);
    
    return Math.max(1, Math.min(5, score));
  }

  // Calculate length appropriateness (0-5)
  static calculateLengthScore(text: string): number {
    const wordCount = text.trim().split(/\s+/).length;
    
    if (wordCount < 5) return 2.0; // too short
    if (wordCount >= 5 && wordCount <= 15) return 4.0; // good for simple prompts
    if (wordCount >= 16 && wordCount <= 50) return 5.0; // ideal range
    if (wordCount >= 51 && wordCount <= 100) return 4.0; // acceptable for complex
    return 3.0; // too long
  }

  // Calculate structure score (0-5)
  static calculateStructure(text: string): number {
    let score = 3.0; // base score
    
    // Check for proper sentence structure
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length > 1) score += 0.5; // multiple sentences
    
    // Check for commas (good for lists/descriptions)
    const commaCount = (text.match(/,/g) || []).length;
    if (commaCount >= 2 && commaCount <= 6) score += 0.5;
    
    // Check for parentheses or brackets (additional context)
    if (/[\(\)\[\]]/.test(text)) score += 0.5;
    
    // Penalize run-on sentences
    const hasRunOnSentence = sentences.some(sentence => 
      sentence.trim().split(/\s+/).length > 30
    );
    if (hasRunOnSentence) score -= 1.0;
    
    return Math.max(1, Math.min(5, score));
  }

  // Calculate creativity score (0-5)
  static calculateCreativity(text: string): number {
    let score = 3.0; // base score
    
    // Count artistic/creative terms
    const creativeWords = ['artistic', 'surreal', 'abstract', 'imaginative', 'fantasy', 'magical', 'ethereal', 'dreamlike', 'whimsical', 'avant-garde'];
    const creativeCount = creativeWords.reduce((count, word) => 
      count + (text.toLowerCase().includes(word) ? 1 : 0), 0
    );
    score += Math.min(1.5, creativeCount * 0.4);
    
    // Count style references
    const styleReferences = ['in the style of', 'inspired by', 'reminiscent of'];
    const hasStyleRef = styleReferences.some(ref => 
      text.toLowerCase().includes(ref)
    );
    if (hasStyleRef) score += 0.5;
    
    // Count unique combinations
    const uniqueCombo = /\b(?:cyberpunk|steampunk|art nouveau|art deco|impressionist|cubist|minimalist|maximalist)\b/gi;
    if (uniqueCombo.test(text)) score += 0.5;
    
    return Math.max(1, Math.min(5, score));
  }

  // Extract keywords from text
  static extractKeywords(text: string, limit = 10): { word: string; count: number }[] {
    if (!text) return [];
    
    // Remove common stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
    ]);

    // Extract words, filter and count frequency
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));

    const frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Sort by frequency and return top keywords
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([word, count]) => ({ word, count }));
  }

  // Suggest improvements
  static suggestImprovements(text: string, analysis: PromptAnalysis): { type: string; message: string }[] {
    const suggestions = [];

    if (analysis.clarity < 3.5) {
      suggestions.push({
        type: 'clarity',
        message: '더 명확한 지시어를 사용해보세요. 예: "생성해주세요", "만들어주세요"'
      });
    }

    if (analysis.specificity < 3.5) {
      suggestions.push({
        type: 'specificity',
        message: '더 구체적인 설명을 추가해보세요. 색상, 스타일, 크기 등을 명시하세요.'
      });
    }

    if (analysis.length < 3.0) {
      const wordCount = text.trim().split(/\s+/).length;
      if (wordCount < 10) {
        suggestions.push({
          type: 'length',
          message: '프롬프트가 너무 짧습니다. 더 자세한 설명을 추가해보세요.'
        });
      } else {
        suggestions.push({
          type: 'length',
          message: '프롬프트가 너무 깁니다. 핵심 내용만 간결하게 작성해보세요.'
        });
      }
    }

    if (analysis.structure < 3.5) {
      suggestions.push({
        type: 'structure',
        message: '문장 구조를 개선해보세요. 쉼표나 문장 나누기를 활용하세요.'
      });
    }

    return suggestions;
  }

  // Compress prompt (remove unnecessary words)
  static compressPrompt(text: string): string {
    if (!text) return text;

    return text
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove filler words
      .replace(/\b(please|kindly|very|really|quite|rather|somewhat|just|simply|basically|actually)\b/gi, '')
      // Remove redundant phrases
      .replace(/\b(in order to|for the purpose of)\b/gi, 'to')
      .replace(/\b(due to the fact that|owing to the fact that)\b/gi, 'because')
      // Clean up
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Expand prompt (add helpful details)
  static expandPrompt(text: string, category: string = 'image'): string {
    if (!text) return text;

    const expansions = {
      image: [
        'high quality, detailed',
        'professional photography',
        'realistic lighting',
        'sharp focus'
      ],
      video: [
        'smooth motion',
        'cinematic quality',
        'professional grade'
      ],
      document: [
        'comprehensive',
        'well-structured',
        'informative'
      ],
      code: [
        'clean code',
        'well-commented',
        'efficient implementation'
      ]
    };

    const categoryExpansions = expansions[category] || expansions.image;
    const randomExpansion = categoryExpansions[Math.floor(Math.random() * categoryExpansions.length)];
    
    return `${text}, ${randomExpansion}`;
  }
}
